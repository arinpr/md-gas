// lib/quoteEngine.spec.js
import { buildBoilerQuote } from "./quoteEngine";
import { SERVICE_QUESTIONS } from "@/components/extra/boilerSteps";

function a(label, value) {
    return value == null ? { label } : { label, value };
}

function assert(cond, msg) {
    if (!cond) throw new Error(msg);
}

function run() {
    const Q = SERVICE_QUESTIONS.new;

    // 1) Up to 6 rads + 1 bath => combi allowed + 24kW target => show 24/25 variants
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("Up to 6"),
                bathrooms: a("1"),
                thermostat_type: a("Basic"),
                trv_required: a("No"),
                flue_type: a("Horizontal"),
                flue_wall: a("Yes"),
            },
        });

        assert(quote.eligibility.selectedBoilerType === "combi", "T1 should select combi");
        assert(quote.sizing.targetKw === 24, "T1 targetKw should be 24");
        assert(quote.products.some((p) => p.kw === 24), "T1 should include 24kW");
        assert(quote.products.some((p) => p.kw === 25), "T1 should include 25kW");
    }

    // 2) Up to 6 rads + 2 baths => SPEC blocks combi (table says 2+ block)
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("Up to 6"),
                bathrooms: a("2"),
            },
        });
        assert(quote.eligibility.selectedBoilerType !== "combi", "T2 combi must be blocked by table");
    }

    // 3) 7–12 rads + 2 baths => combi allowed + 35 => show 35/36 variants
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("7–12"),
                bathrooms: a("2"),
            },
        });
        assert(quote.eligibility.selectedBoilerType === "combi", "T3 should select combi");
        assert(quote.sizing.targetKw === 35, "T3 targetKw should be 35");
        assert(quote.products.some((p) => p.kw === 35), "T3 should include 35kW");
        assert(quote.products.some((p) => p.kw === 36), "T3 should include 36kW");
    }

    // 4) 13–20 rads + 2 baths => combi blocked => system
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("13–20"),
                bathrooms: a("2"),
            },
        });
        assert(quote.eligibility.selectedBoilerType === "system", "T4 should default to system");
    }

    // 5) 21+ rads => combi blocked => system
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("21+"),
                bathrooms: a("1"),
            },
        });
        assert(quote.eligibility.selectedBoilerType === "system", "T5 should default to system");
    }

    // 6) TRVs: qty 5 => +175
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("7–12"),
                bathrooms: a("1"),
                trv_required: a("Yes"),
                trv_qty: a("5", 5),
            },
        });
        assert(quote.addOns.total === 175, "T6 TRV total should be 175");
    }

    // 7) Smart stat => +100
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("7–12"),
                bathrooms: a("1"),
                thermostat_type: a("Smart"),
            },
        });
        assert(quote.addOns.total === 100, "T7 Smart stat should be +100");
    }

    // 8) Combi vertical flue => +300 (horizontal included)
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("7–12"),
                bathrooms: a("1"),
                flue_type: a("Vertical"),
            },
        });
        assert(quote.eligibility.selectedBoilerType === "combi", "T8 should be combi");
        assert(quote.addOns.items.some((x) => x.key === "combi_vertical_flue"), "T8 should add combi vertical flue");
        assert(quote.addOns.total === 300, "T8 vertical flue should be +300");
    }

    // 9) System horizontal flue => +150
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("13–20"),
                bathrooms: a("2"), // forces system
                flue_type: a("Horizontal"),
            },
        });
        assert(quote.eligibility.selectedBoilerType === "system", "T9 should be system");
        assert(quote.addOns.items.some((x) => x.key === "sys_heat_horizontal_flue"), "T9 should add sys/heat horizontal");
        assert(quote.addOns.total === 150, "T9 should be +150");
    }

    // 10) Auto-force vertical when flue_wall=No (even if flue_type says Horizontal)
    {
        const quote = buildBoilerQuote({
            questions: Q,
            answers: {
                radiators: a("7–12"),
                bathrooms: a("1"),
                flue_type: a("Horizontal"),
                flue_wall: a("No"),
            },
        });
        assert(quote.addOns.derived.flueType === "vertical", "T10 should force vertical");
    }

    return "ALL TESTS PASSED";
}

console.log(run());
