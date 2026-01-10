import { RULES as DEFAULT_RULES, ADDONS as DEFAULT_ADDONS } from "@/lib/quoteConfig";
import { PRODUCTS as DEFAULT_PRODUCTS } from "@/lib/productsCatalog";
import { usePage } from "@inertiajs/react";

function numOrFallback(v, fallback) {
  if (v === null || v === undefined || v === "") return fallback;
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function useEffectiveConfig() {
  const { pricingOverrides } = usePage().props || {};
  const oRules = pricingOverrides?.rules || {};
  const oAddons = pricingOverrides?.addons || {};
  const oProducts = pricingOverrides?.products || {};

  // RULES
  const RULES = {
    ...DEFAULT_RULES,
    MIN_MARGIN_SYSTEM_HEAT: numOrFallback(oRules.MIN_MARGIN_SYSTEM_HEAT, DEFAULT_RULES.MIN_MARGIN_SYSTEM_HEAT),
    TRV_MAX_QTY: numOrFallback(oRules.TRV_MAX_QTY, DEFAULT_RULES.TRV_MAX_QTY),
  };

  // ADDONS (keep same keys/shape; override only unitPrice)
  const ADDONS = clone(DEFAULT_ADDONS);
  Object.keys(ADDONS).forEach((constKey) => {
    const unitKey = `${constKey}.unitPrice`; // TRV.unitPrice etc.
    if (oAddons[unitKey] !== undefined) {
      ADDONS[constKey].unitPrice = numOrFallback(oAddons[unitKey], ADDONS[constKey].unitPrice);
    }
  });

  // PRODUCTS (override by id.field)
  const PRODUCTS = DEFAULT_PRODUCTS.map((p) => {
    const next = { ...p };

    if (oProducts[`${p.id}.basePrice`] !== undefined) {
      next.basePrice = oProducts[`${p.id}.basePrice`] === null
        ? null
        : numOrFallback(oProducts[`${p.id}.basePrice`], p.basePrice);
    }

    if (oProducts[`${p.id}.boilerCost`] !== undefined) {
      next.boilerCost = oProducts[`${p.id}.boilerCost`] === null
        ? null
        : numOrFallback(oProducts[`${p.id}.boilerCost`], p.boilerCost);
    }

    if (oProducts[`${p.id}.minMargin`] !== undefined) {
      next.minMargin = numOrFallback(oProducts[`${p.id}.minMargin`], p.minMargin);
    }

    return next;
  });

  return { RULES, ADDONS, PRODUCTS };
}
