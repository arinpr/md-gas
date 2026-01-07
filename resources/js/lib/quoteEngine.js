// lib/quoteEngine.js
import { PRODUCTS } from "./productsCatalog";
import { ADDONS, RULES } from "./quoteConfig";

const money = (n) => Math.round((Number(n) || 0) * 100) / 100;

function label(v) {
    return v?.label ?? null;
}

function isYes(v) {
    return (v?.label || "").toLowerCase() === "yes";
}

function clampInt(n, min, max) {
    const x = Number(n);
    if (Number.isNaN(x)) return min;
    return Math.max(min, Math.min(max, Math.trunc(x)));
}

function questionMap(questions = []) {
    const map = new Map();
    for (const q of questions) map.set(q.id, q.question);
    return map;
}

/* ===========================
  1) Parse spec buckets
=========================== */

function parseRadsBucket(lab) {
    if (!lab) return null;
    if (lab.includes("Up to")) return "UP_TO_6";
    if (lab.includes("7")) return "R7_12";
    if (lab.includes("13")) return "R13_20";
    if (lab.includes("21")) return "R21_PLUS";
    return null;
}

function parseBaths(lab) {
    if (!lab) return null;
    if (lab === "1") return 1;
    if (lab === "1.5") return 1.5;
    if (lab === "2") return 2;
    if (lab.includes("3")) return 3;
    return null;
}

/* ===========================
  2) Eligibility + sizing (SPEC)
=========================== */

// SPEC: Combi allowed only when rads <= 20 AND baths <= 2
function combiAllowed(radsBucket, baths) {
    if (!radsBucket || baths == null) return false; // strict
    const radsOk = radsBucket !== "R21_PLUS";
    const bathsOk = baths <= 2;
    return radsOk && bathsOk;
}

// SPEC: Combi sizing table
function combiTargetKw(radsBucket, baths) {
    if (!radsBucket || baths == null) return null;

    // Up to 6 rads:
    // 1 bath -> 24
    // 1.5 bath -> 30
    // 2+ -> block combi  (SPEC says 2+ blocks here)
    if (radsBucket === "UP_TO_6") {
        if (baths === 1) return 24;
        if (baths === 1.5) return 30;
        return null; // 2 or 3+
    }

    // 7–12 rads:
    // 1 bath -> 30
    // 1.5 bath -> 30
    // 2 bath -> 35
    // 3+ -> block
    if (radsBucket === "R7_12") {
        if (baths === 1) return 30;
        if (baths === 1.5) return 30;
        if (baths === 2) return 35;
        return null;
    }

    // 13–20 rads:
    // <=1.5 bath -> 35
    // 2+ -> block
    if (radsBucket === "R13_20") {
        if (baths <= 1.5) return 35;
        return null;
    }

    // 21+ -> blocked
    return null;
}

// SPEC: System & Heat-only sizing bands
function sysHeatBand(radsBucket) {
    if (!radsBucket) return { min: 18, max: 24 };

    if (radsBucket === "UP_TO_6") return { min: 15, max: 18 };
    if (radsBucket === "R7_12") return { min: 18, max: 24 };
    if (radsBucket === "R13_20") return { min: 24, max: 30 };
    return { min: 30, max: 60 }; // 21+ => 30kW+
}

// Deterministic pick: choose the highest available within band; if none, choose nearest above min; else nearest below max.
function pickKwForSystemHeat(productsOfType, band) {
    const within = productsOfType
        .map((p) => p.kw)
        .filter((kw) => kw >= band.min && kw <= band.max)
        .sort((a, b) => b - a);

    if (within.length) return within[0];

    const aboveMin = productsOfType
        .map((p) => p.kw)
        .filter((kw) => kw > band.min)
        .sort((a, b) => a - b);
    if (aboveMin.length) return aboveMin[0];

    const belowMax = productsOfType
        .map((p) => p.kw)
        .filter((kw) => kw < band.max)
        .sort((a, b) => b - a);
    if (belowMax.length) return belowMax[0];

    return null;
}

/* ===========================
  3) Flue logic (SPEC + your auto rule)
=========================== */

function resolveFlueType(answers) {
    // Canonical selection
    let flue = (answers?.flue_type?.label || "Horizontal").toLowerCase(); // horizontal|vertical

    // Auto-rule you requested: if flue does NOT come out of the wall => force Vertical
    if (answers?.flue_wall?.label === "No") {
        flue = "vertical";
    }

    return flue; // "horizontal" | "vertical"
}

/* ===========================
  4) Add-ons (SPEC)
=========================== */

function computeAddOns(answers, boilerType) {
    const items = [];

    // Smart stat (+100) — only if Smart chosen (Basic included)
    if ((answers?.thermostat_type?.label || "Basic").toLowerCase() === "smart") {
        items.push({
            key: ADDONS.SMART_STAT.key,
            label: ADDONS.SMART_STAT.label,
            qty: 1,
            unitPrice: ADDONS.SMART_STAT.unitPrice,
            total: ADDONS.SMART_STAT.unitPrice,
        });
    }

    // TRVs: £35 x qty
    if ((answers?.trv_required?.label || "No") === "Yes") {
        const qty = clampInt(answers?.trv_qty?.value ?? 0, 0, RULES.TRV_MAX_QTY);
        if (qty > 0) {
            items.push({
                key: ADDONS.TRV.key,
                label: ADDONS.TRV.label,
                qty,
                unitPrice: ADDONS.TRV.unitPrice,
                total: money(qty * ADDONS.TRV.unitPrice),
            });
        }
    }

    // Flue add-ons
    const flue = resolveFlueType(answers);

    if (boilerType === "combi") {
        // Horizontal included; Vertical +300
        if (flue === "vertical") {
            items.push({
                key: ADDONS.COMBI_VERTICAL_FLUE.key,
                label: ADDONS.COMBI_VERTICAL_FLUE.label,
                qty: 1,
                unitPrice: ADDONS.COMBI_VERTICAL_FLUE.unitPrice,
                total: ADDONS.COMBI_VERTICAL_FLUE.unitPrice,
            });
        }
    } else {
        // System / Heat-only: Horizontal +150 OR Vertical +300
        if (flue === "horizontal") {
            items.push({
                key: ADDONS.SYS_HEAT_HORIZONTAL_FLUE.key,
                label: ADDONS.SYS_HEAT_HORIZONTAL_FLUE.label,
                qty: 1,
                unitPrice: ADDONS.SYS_HEAT_HORIZONTAL_FLUE.unitPrice,
                total: ADDONS.SYS_HEAT_HORIZONTAL_FLUE.unitPrice,
            });
        } else {
            items.push({
                key: ADDONS.SYS_HEAT_VERTICAL_FLUE.key,
                label: ADDONS.SYS_HEAT_VERTICAL_FLUE.label,
                qty: 1,
                unitPrice: ADDONS.SYS_HEAT_VERTICAL_FLUE.unitPrice,
                total: ADDONS.SYS_HEAT_VERTICAL_FLUE.unitPrice,
            });
        }
    }

    // Optional client extras (kept configurable)
    if (isYes(answers?.boiler_move_location)) {
        items.push({
            key: ADDONS.BOILER_RELOCATION.key,
            label: ADDONS.BOILER_RELOCATION.label,
            qty: 1,
            unitPrice: ADDONS.BOILER_RELOCATION.unitPrice,
            total: ADDONS.BOILER_RELOCATION.unitPrice,
        });
    }
    if (isYes(answers?.move_to_combi)) {
        items.push({
            key: ADDONS.CONVERT_TO_COMBI.key,
            label: ADDONS.CONVERT_TO_COMBI.label,
            qty: 1,
            unitPrice: ADDONS.CONVERT_TO_COMBI.unitPrice,
            total: ADDONS.CONVERT_TO_COMBI.unitPrice,
        });
    }

    const total = money(items.reduce((s, x) => s + (x.total || 0), 0));
    return { items, total, derived: { flueType: flue } };
}

/* ===========================
  5) Product filtering
=========================== */

function combiKwMatch(productKw, targetKw) {
    // 24 target => show 24 & 25
    if (targetKw === 24) return productKw === 24 || productKw === 25;
    if (targetKw === 30) return productKw === 30;
    if (targetKw === 35) return productKw === 35 || productKw === 36;
    return false;
}

/* ===========================
  6) Main builder (single source of truth)
=========================== */

export function buildBoilerQuote({ answers, questions = [] }) {
    const qMap = questionMap(questions);

    const radsBucket = parseRadsBucket(label(answers?.radiators));
    const baths = parseBaths(label(answers?.bathrooms));

    const combiOk = combiAllowed(radsBucket, baths);
    const combiKw = combiTargetKw(radsBucket, baths); // may be null if blocked by table

    const allowedBoilerTypes = {
        combi: combiOk && combiKw != null,
        system: true,
        heat_only: true,
    };

    // Selection policy (deterministic):
    // 1) If combi allowed by both global rule + table => default to combi
    // 2) Else default to system (you can change to heat_only if your business prefers)
    const selectedBoilerType = allowedBoilerTypes.combi ? "combi" : "system";

    // Determine target sizing
    let sizing = null;
    if (selectedBoilerType === "combi") {
        sizing = { type: "combi", targetKw: combiKw };
    } else {
        const band = sysHeatBand(radsBucket);
        const typeProducts = PRODUCTS.filter((p) => p.type === selectedBoilerType);
        const chosenKw = pickKwForSystemHeat(typeProducts, band);
        sizing = { type: selectedBoilerType, band, targetKw: chosenKw };
    }

    // Add-ons
    const addOns = computeAddOns(answers, selectedBoilerType);

    // Filter products
    let products = PRODUCTS.filter((p) => p.type === selectedBoilerType);

    if (selectedBoilerType === "combi") {
        products = products.filter((p) => combiKwMatch(p.kw, combiKw));
    } else {
        // System/Heat-only: show those in chosen band; if no band match, show nearest 3 products (sorted by kw)
        const band = sizing.band;
        const inBand = products.filter((p) => p.kw >= band.min && p.kw <= band.max);
        products = inBand.length ? inBand : products.sort((a, b) => a.kw - b.kw).slice(0, 3);
    }

    // Price products
    const pricedProducts = products.map((p) => {
        const base =
            selectedBoilerType === "combi"
                ? Number(p.baseInstallPrice || 0)
                : money(Number(p.boilerCost || 0) + RULES.MIN_MARGIN_SYSTEM_HEAT);

        const marginApplied = selectedBoilerType === "combi" ? 0 : RULES.MIN_MARGIN_SYSTEM_HEAT;

        // If boilerCost is null for system/heat-only, price is incomplete
        const pricingComplete =
            selectedBoilerType === "combi" ? true : p.boilerCost != null;

        const total = pricingComplete ? money(base + addOns.total) : null;

        return {
            ...p,
            pricing: {
                base,
                marginApplied,
                addOnsTotal: addOns.total,
                total,
                pricingComplete,
            },
        };
    });

    // Recommended: first complete price; else first
    const recommended = pricedProducts.find((x) => x.pricing.pricingComplete) || pricedProducts[0] || null;

    // Answers detailed
    const answersDetailed = Object.entries(answers || {}).map(([id, val]) => ({
        id,
        question: qMap.get(id) || id,
        answerLabel: val?.label ?? null,
        answerValue: val?.value ?? null,
        raw: val,
    }));

    // Totals
    const totals = {
        addOns: addOns.total,
        recommendedBase: recommended?.pricing?.base ?? null,
        recommendedTotal: recommended?.pricing?.total ?? null,
    };

    return {
        meta: {
            version: "3.0",
            generatedAt: new Date().toISOString(),
        },
        inputs: {
            radiators: label(answers?.radiators),
            bathrooms: label(answers?.bathrooms),
            thermostat: label(answers?.thermostat_type) || "Basic",
            flueType: addOns.derived.flueType,
            trvRequired: label(answers?.trv_required) || "No",
            trvQty: Number(answers?.trv_qty?.value ?? 0),
        },
        eligibility: {
            allowedBoilerTypes,
            selectedBoilerType,
        },
        sizing,
        answers: {
            raw: answers,
            detailed: answersDetailed,
        },
        addOns,
        products: pricedProducts,
        recommendedProductId: recommended?.id || null,
        totals,
    };
}
