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

  if (radsBucket === "UP_TO_6") {
    if (baths === 1) return 24;
    if (baths === 1.5) return 30;
    return null; // 2 or 3+
  }

  if (radsBucket === "R7_12") {
    if (baths === 1) return 30;
    if (baths === 1.5) return 30;
    if (baths === 2) return 35;
    return null; // 3+
  }

  if (radsBucket === "R13_20") {
    if (baths <= 1.5) return 35;
    return null; // 2+
  }

  return null; // 21+ blocked
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
  3) Flue logic (LATEST RULE)
  - If flue comes out the wall = No => vertical add-on
  - If Yes => no flue add-on required
=========================== */

function resolveFlueType(answers) {
  return (answers?.flue_wall?.label || "").toLowerCase() === "no"
    ? "vertical"
    : "horizontal";
}

/* ===========================
  4) Add-ons (SPEC + corrections)
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

  // Flue add-ons (simplified)
  const flue = resolveFlueType(answers);

  if (flue === "vertical") {
    // For now your add-on catalog uses the same +300 for all types (per your latest simplification)
    // If your quoteConfig distinguishes combi vs system, keep your existing keys and switch here.
    const verticalKey =
      boilerType === "combi" && ADDONS.COMBI_VERTICAL_FLUE
        ? ADDONS.COMBI_VERTICAL_FLUE
        : (ADDONS.SYS_HEAT_VERTICAL_FLUE || ADDONS.VERTICAL_FLUE);

    items.push({
      key: verticalKey.key,
      label: verticalKey.label,
      qty: 1,
      unitPrice: verticalKey.unitPrice,
      total: verticalKey.unitPrice,
    });
  } else {
    // flue out the wall = Yes => no add-on required (per your latest instruction)
    // NOTE: This intentionally does NOT add +150 horizontal for system/heat-only.
  }

  // Boiler relocation (+£800) if move location = Yes
  if (isYes(answers?.boiler_move_location)) {
    items.push({
      key: ADDONS.BOILER_RELOCATION.key,
      label: ADDONS.BOILER_RELOCATION.label,
      qty: 1,
      unitPrice: ADDONS.BOILER_RELOCATION.unitPrice,
      total: ADDONS.BOILER_RELOCATION.unitPrice,
    });
  }

  // Conversion to combi (+£800) ONLY when moving to combi AND currently not combi
  const currentType = (answers?.current_boiler_type?.label || "").toLowerCase();
  const currentlyCombi = currentType.includes("combi");
  if (isYes(answers?.move_to_combi) && !currentlyCombi) {
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

  const wantsCombi = isYes(answers?.move_to_combi);

  // ✅ FIX 1: Force combi-only when customer wants to convert to combi
  const selectedBoilerType = wantsCombi
    ? "combi"
    : (allowedBoilerTypes.combi ? "combi" : "system");

  // Determine target sizing (for display only; forced combi may not have a targetKw)
  let sizing = null;

  if (selectedBoilerType === "combi") {
    sizing = { type: "combi", targetKw: combiKw }; // could be null when forced
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
    const filtered = combiKw != null ? products.filter((p) => combiKwMatch(p.kw, combiKw)) : [];
    // ✅ FIX 2: If forced combi but sizing table blocks, show all combi options
    products = filtered.length ? filtered : products;
  } else {
    const band = sizing.band;
    const inBand = products.filter((p) => p.kw >= band.min && p.kw <= band.max);
    products = inBand.length ? inBand : products.sort((a, b) => a.kw - b.kw).slice(0, 3);
  }

  // Price products
  const pricedProducts = products.map((p) => {
    const base =
      selectedBoilerType === "combi"
        ? Number(p.baseInstallPrice || p.basePrice || 0) // supports both catalog shapes
        : money(Number(p.boilerCost || 0) + RULES.MIN_MARGIN_SYSTEM_HEAT);

    const marginApplied = selectedBoilerType === "combi" ? 0 : RULES.MIN_MARGIN_SYSTEM_HEAT;

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

  const recommended =
    pricedProducts.find((x) => x.pricing.pricingComplete) || pricedProducts[0] || null;

  const answersDetailed = Object.entries(answers || {}).map(([id, val]) => ({
    id,
    question: qMap.get(id) || id,
    answerLabel: val?.label ?? null,
    answerValue: val?.value ?? null,
    raw: val,
  }));

  const totals = {
    addOns: addOns.total,
    recommendedBase: recommended?.pricing?.base ?? null,
    recommendedTotal: recommended?.pricing?.total ?? null,
  };

  return {
    meta: {
      version: "3.1",
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
      forcedToCombi: wantsCombi && !allowedBoilerTypes.combi,
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
