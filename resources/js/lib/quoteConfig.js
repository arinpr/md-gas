// lib/quoteConfig.js
export const RULES = {
    MIN_MARGIN_SYSTEM_HEAT: 750,
    TRV_MAX_QTY: 13,
};

export const ADDONS = {
    TRV: { key: "trv", label: "TRV supply & fit", unitPrice: 35 },
    SMART_STAT: { key: "smart_stat", label: "Smart thermostat upgrade", unitPrice: 100 },

    // Flues
    COMBI_VERTICAL_FLUE: { key: "combi_vertical_flue", label: "Vertical flue (Combi)", unitPrice: 300 },
    SYS_HEAT_HORIZONTAL_FLUE: { key: "sys_heat_horizontal_flue", label: "Horizontal flue (System/Heat-only)", unitPrice: 150 },
    SYS_HEAT_VERTICAL_FLUE: { key: "sys_heat_vertical_flue", label: "Vertical flue (System/Heat-only)", unitPrice: 300 },

    // Client “later usage” items (configurable)
    BOILER_RELOCATION: { key: "boiler_relocation", label: "Boiler relocation", unitPrice: 800 },
    CONVERT_TO_COMBI: { key: "convert_to_combi", label: "Conversion to combi", unitPrice: 800 },
};
