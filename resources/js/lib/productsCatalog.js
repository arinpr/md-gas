// lib/productsCatalog.js

export const PRODUCTS = [
    /* ===========================
       COMBI BOILERS (FIXED PRICE)
       DO NOT RECALCULATE BASE PRICE
    =========================== */

    {
        id: "ideal_atlantic_24",
        type: "combi",
        brand: "Ideal",
        model: "Atlantic Combi",
        kw: 24,
        warrantyYears: 5,
        priceType: "fixed",
        basePrice: 1599,

        includes: [
            "Magnetic filter",
            "Scale reducer",
            "Shock arrestor",
            "Standard horizontal flue",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],

        notes: [
            "Fixed install price – must not be recalculated",
            "Vertical flue adds £300 if required",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    {
        id: "ideal_atlantic_30",
        type: "combi",
        brand: "Ideal",
        model: "Atlantic Combi",
        kw: 30,
        warrantyYears: 5,
        priceType: "fixed",
        basePrice: 1699,
        includes: [
            "Magnetic filter",
            "Scale reducer",
            "Shock arrestor",
            "Standard horizontal flue",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],
        notes: [
            "Fixed install price – must not be recalculated",
            "Vertical flue adds £300 if required",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    {
        id: "ideal_atlantic_35",
        type: "combi",
        brand: "Ideal",
        model: "Atlantic Combi",
        kw: 35,
        warrantyYears: 5,
        priceType: "fixed",
        basePrice: 1849,
        includes: [
            "Magnetic filter",
            "Scale reducer",
            "Shock arrestor",
            "Standard horizontal flue",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],
        notes: [
            "Fixed install price – must not be recalculated",
            "Vertical flue adds £300 if required",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    {
        id: "baxi_800_25",
        type: "combi",
        brand: "Baxi",
        model: "800 Combi",
        kw: 25,
        warrantyYears: 10,
        priceType: "fixed",
        basePrice: 1875,
        includes: [
            "Magnetic filter",
            "Scale reducer",
            "Shock arrestor",
            "Standard horizontal flue",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],
        notes: [
            "Fixed install price – must not be recalculated",
            "Vertical flue adds £300 if required",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    {
        id: "baxi_800_30",
        type: "combi",
        brand: "Baxi",
        model: "800 Combi",
        kw: 30,
        warrantyYears: 10,
        priceType: "fixed",
        basePrice: 1999,
        includes: [
            "Magnetic filter",
            "Scale reducer",
            "Shock arrestor",
            "Standard horizontal flue",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],
        notes: [
            "Fixed install price – must not be recalculated",
            "Vertical flue adds £300 if required",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    {
        id: "baxi_800_36",
        type: "combi",
        brand: "Baxi",
        model: "800 Combi",
        kw: 36,
        warrantyYears: 10,
        priceType: "fixed",
        basePrice: 2199,
        includes: [
            "Magnetic filter",
            "Scale reducer",
            "Shock arrestor",
            "Standard horizontal flue",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],
        notes: [
            "Fixed install price – must not be recalculated",
            "Vertical flue adds £300 if required",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    /* ===========================
       SYSTEM BOILERS (COST + £750)
    =========================== */

    {
        id: "ideal_system2_15",
        type: "system",
        brand: "Ideal",
        model: "Logic System2 S15",
        kw: 15,
        warrantyYears: 2,
        priceType: "cost_plus",
        boilerCost: 1099.03,
        minMargin: 750,

        includes: [
            "Magnetic filter",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],

        notes: [
            "Final price = boiler cost + £750 minimum margin",
            "Horizontal flue adds £150",
            "Vertical flue adds £300",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    {
        id: "ideal_system2_18",
        type: "system",
        brand: "Ideal",
        model: "Logic System2 S18",
        kw: 18,
        warrantyYears: 2,
        priceType: "cost_plus",
        boilerCost: 1147.57,
        minMargin: 750,
        includes: [
            "Magnetic filter",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],
        notes: [
            "Final price = boiler cost + £750 minimum margin",
            "Horizontal flue adds £150",
            "Vertical flue adds £300",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    {
        id: "ideal_system2_24",
        type: "system",
        brand: "Ideal",
        model: "Logic System2 S24",
        kw: 24,
        warrantyYears: 2,
        priceType: "cost_plus",
        boilerCost: 1196.06,
        minMargin: 750,
        includes: [
            "Magnetic filter",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],
        notes: [
            "Final price = boiler cost + £750 minimum margin",
            "Horizontal flue adds £150",
            "Vertical flue adds £300",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },

    /* ===========================
       HEAT ONLY (COST + £750)
    =========================== */

    {
        id: "baxi_heat_415",
        type: "heat_only",
        brand: "Baxi",
        model: "415 Heat Only",
        kw: 15,
        warrantyYears: 5,
        priceType: "cost_plus",
        boilerCost: null,
        minMargin: 750,
        includes: [
            "Magnetic filter",
            "Basic wireless programmable thermostat",
            "Chemical flush + inhibitor",
            "Old boiler removal & disposal",
            "Commissioning + registration",
        ],
        notes: [
            "Trade boiler cost required before pricing",
            "Final price = boiler cost + £750 minimum margin",
            "Horizontal flue adds £150",
            "Vertical flue adds £300",
            "Smart thermostat upgrade adds £100",
            "TRVs £35 each",
        ],
    },
];
