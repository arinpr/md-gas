import React, { useMemo, useRef, useState, useEffect } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

import { RULES as DEFAULT_RULES, ADDONS as DEFAULT_ADDONS } from "@/lib/quoteConfig";
import { PRODUCTS as DEFAULT_PRODUCTS } from "@/lib/productsCatalog";

function fmt(v) {
  if (v === null || v === undefined) return "—";
  return String(v);
}

function getDefaultFor(tab, key) {
  if (tab === "rules") return DEFAULT_RULES?.[key] ?? null;

  if (tab === "addons") {
    const [addonConst, field] = key.split(".");
    return DEFAULT_ADDONS?.[addonConst]?.[field] ?? null;
  }

  // products
  const [id, field] = key.split(".");
  const p = DEFAULT_PRODUCTS.find((x) => x.id === id);
  return p?.[field] ?? null;
}

function getEffective(defaultValue, overrideValue) {
  return overrideValue !== undefined ? overrideValue : defaultValue;
}

function isMobile() {
  if (typeof window === "undefined") return false;
  return window.matchMedia && window.matchMedia("(max-width: 1023px)").matches; // < lg
}

/**
 * ✅ IMPORTANT FIX:
 * This component is OUTSIDE the main component, so it does NOT get recreated on every render.
 * That prevents the input from unmounting and losing focus on every keystroke.
 */
function EditorPanel({
  compact = false,
  tab,
  editKey,
  value,
  setValue,
  inputRef,
  groupOverrides,
  currentDefault,
  onSave,
  onReset,
  onClose,
}) {
  return (
    <div
      className={`${
        compact ? "" : "lg:sticky lg:top-6"
      } rounded-2xl border border-gray-200 bg-white overflow-hidden`}
    >
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="font-semibold text-gray-900">Editor</div>
        <div className="text-xs text-slate-500 mt-1">
          Set an override value or reset to default.
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div>
            <div className="text-xs text-slate-500 mb-1">Group</div>
            <input
              className="w-full rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 text-sm"
              value={tab}
              disabled
            />
          </div>

          <div>
            <div className="text-xs text-slate-500 mb-1">Key</div>
            <input
              className="w-full rounded-xl border border-gray-200 bg-slate-50 px-3 py-2 text-sm"
              value={editKey}
              disabled
              placeholder="Select a key"
            />
          </div>

          <div>
            <div className="text-xs text-slate-500 mb-1">Override Value</div>
            <input
              ref={inputRef}
              className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-gray-300"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Leave empty to use default"
              inputMode="decimal"
              disabled={!editKey}
            />
            <div className="text-xs text-slate-500 mt-1">
              Blank = default. Server enforces numeric rules.
            </div>
          </div>
        </div>

        {/* Value summary */}
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
            <div className="text-xs text-slate-500">Default</div>
            <div className="font-semibold text-gray-900 mt-1">
              {fmt(currentDefault)}
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
            <div className="text-xs text-slate-500">Override</div>
            <div className="font-semibold text-gray-900 mt-1">
              {editKey ? (value === "" ? "—" : value) : "—"}
            </div>
          </div>

          <div className="rounded-xl bg-gray-900 text-white p-3">
            <div className="text-xs text-white/70">Effective</div>
            <div className="font-semibold mt-1">
              {editKey
                ? fmt(getEffective(currentDefault, value === "" ? undefined : value))
                : "—"}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={onSave}
            className="w-full px-4 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold disabled:opacity-50"
            disabled={!editKey}
          >
            Save Override
          </button>

          <button
            onClick={() => onReset(editKey)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50 disabled:opacity-50"
            disabled={!editKey || groupOverrides[editKey] === undefined}
          >
            Reset
          </button>

          {compact ? (
            <button
              onClick={onClose}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50"
            >
              Close
            </button>
          ) : null}
        </div>

        {tab === "rules" && editKey === "TRV_MAX_QTY" ? (
          <div className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-xl p-3">
            TRV_MAX_QTY must be between 0 and 13 (enforced server-side).
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function PricingOverrides() {
  const { overrides = {} } = usePage().props;

  const [tab, setTab] = useState("rules");
  const [query, setQuery] = useState("");

  const groupOverrides = overrides?.[tab] || {};

  const rulesRows = useMemo(
    () => [
      {
        key: "MIN_MARGIN_SYSTEM_HEAT",
        label: "Min margin (System/Heat-only)",
        help: "Applied to system/heat-only pricing.",
      },
    //   {
    //     key: "TRV_MAX_QTY",
    //     label: "TRV max qty (0–13)",
    //     help: "Controls dropdown max for TRVs.",
    //   },
    ],
    []
  );

  const addonRows = useMemo(
    () => [
      { key: "TRV.unitPrice", label: "TRV unit price", help: "Per TRV supply & fit." },
      {
        key: "SMART_STAT.unitPrice",
        label: "Smart thermostat upgrade",
        help: "Applied if Smart selected.",
      },
      {
        key: "COMBI_VERTICAL_FLUE.unitPrice",
        label: "Combi vertical flue",
        help: "Applied when flue_wall = No (Combi).",
      },
      {
        key: "SYS_HEAT_HORIZONTAL_FLUE.unitPrice",
        label: "System/Heat horizontal flue",
        help: "Only if you use it in logic.",
      },
      {
        key: "SYS_HEAT_VERTICAL_FLUE.unitPrice",
        label: "System/Heat vertical flue",
        help: "Applied when flue_wall = No (System/Heat).",
      },
      {
        key: "BOILER_RELOCATION.unitPrice",
        label: "Boiler relocation",
        help: "Applied when moving boiler location.",
      },
      {
        key: "CONVERT_TO_COMBI.unitPrice",
        label: "Convert to combi",
        help: "Applied if converting & not currently combi.",
      },
    ],
    []
  );

  const productRows = useMemo(() => {
    const rows = [];
    for (const p of DEFAULT_PRODUCTS) {
      if (p.priceType === "fixed" || p.priceType === "variable") {
        rows.push({
          key: `${p.id}.basePrice`,
          label: `${p.brand} ${p.model} ${p.kw}kW basePrice`,
          help: `Type: ${p.type} • Price: ${p.priceType}`,
        });
      }
      if (p.priceType === "cost_plus") {
        rows.push({
          key: `${p.id}.boilerCost`,
          label: `${p.brand} ${p.model} ${p.kw}kW boilerCost`,
          help: `Type: ${p.type} • Price: cost_plus`,
        });
        rows.push({
          key: `${p.id}.minMargin`,
          label: `${p.brand} ${p.model} ${p.kw}kW minMargin`,
          help: `Type: ${p.type} • Price: cost_plus`,
        });
      }
    }
    return rows;
  }, []);

  const rows = tab === "rules" ? rulesRows : tab === "addons" ? addonRows : productRows;

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      (`${r.label} ${r.key} ${r.help || ""}`).toLowerCase().includes(q)
    );
  }, [rows, query]);

  // Editor state
  const [editKey, setEditKey] = useState("");
  const [value, setValue] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const inputRef = useRef(null);

  const currentDefault = editKey ? getDefaultFor(tab, editKey) : null;

  function startEdit(k) {
    setEditKey(k);
    const v = groupOverrides[k];
    setValue(v === undefined || v === null ? "" : String(v));

    if (isMobile()) setDrawerOpen(true);
  }

  // ✅ Focus should NOT drop now, because EditorPanel is stable.
  useEffect(() => {
    if (!editKey) return;

    const t = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select?.();
      }
    }, 80);

    return () => clearTimeout(t);
  }, [editKey, drawerOpen]);

  function save() {
    if (!editKey) return;
    router.post(
      route("admin.pricing.save"),
      { group: tab, key: editKey, value: value === "" ? null : value },
      {
        preserveScroll: true,
        onSuccess: () => {
            router.reload({ only: ["overrides", "pricingOverrides"] });
          if (isMobile()) setDrawerOpen(false);
        },
      }
    );
  }

  function reset(k) {
    if (!k) return;
    router.post(
      route("admin.pricing.reset"),
      { group: tab, key: k },
      {
        preserveScroll: true,
        onSuccess: () => {
            router.reload({ only: ["overrides", "pricingOverrides"] });
          if (isMobile()) setDrawerOpen(false);
        },
      }
    );
  }

  function closeDrawer() {
    setDrawerOpen(false);
  }

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Pricing Management For New Boiler Quote
        </h2>
      }
    >
      <Head title="Pricing Management For New Boiler Quote" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Pricing Overrides</h1>
            <p className="text-sm text-slate-600 mt-1">
              Defaults come from JS config. Overrides apply instantly on top.
            </p>
          </div>

          <div className="flex gap-2">
            {["rules", "addons", "products"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTab(t);
                  setEditKey("");
                  setValue("");
                  setQuery("");
                }}
                className={`px-4 py-2 rounded-xl border text-sm font-semibold transition ${
                  tab === t
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-900 border-gray-200 hover:bg-gray-50"
                }`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${tab}…`}
            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-gray-300"
          />
        </div>

        {/* Desktop grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* List */}
          <div className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
              <div className="font-semibold text-gray-900">Keys</div>
              <div className="text-xs text-slate-500">{filteredRows.length} items</div>
            </div>

            <div className="divide-y">
              {filteredRows.map((r) => {
                const defaultValue = getDefaultFor(tab, r.key);
                const overrideValue = groupOverrides[r.key];
                const hasOverride = overrideValue !== undefined;
                const effectiveValue = getEffective(defaultValue, overrideValue);

                return (
                  <div key={r.key} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-gray-900 truncate">{r.label}</div>
                        <div className="mt-0.5 text-xs text-slate-500 font-mono break-all">
                          {r.key}
                        </div>
                        {r.help ? (
                          <div className="mt-1 text-xs text-slate-600">{r.help}</div>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`text-xs px-2 py-1 rounded-full border ${
                            hasOverride
                              ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                              : "bg-slate-50 border-slate-200 text-slate-600"
                          }`}
                        >
                          {hasOverride ? "Override ON" : "Default"}
                        </span>

                        <button
                          onClick={() => startEdit(r.key)}
                          className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                        >
                          Edit
                        </button>

                        {!isMobile() && hasOverride ? (
                          <button
                            onClick={() => reset(r.key)}
                            className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                          >
                            Reset
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {/* Values */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-sm">
                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                        <div className="text-xs text-slate-500">Default</div>
                        <div className="font-semibold text-gray-900 mt-1">{fmt(defaultValue)}</div>
                      </div>

                      <div className="rounded-xl bg-slate-50 border border-slate-100 p-3">
                        <div className="text-xs text-slate-500">Override</div>
                        <div className="font-semibold text-gray-900 mt-1">
                          {hasOverride ? fmt(overrideValue) : "—"}
                        </div>
                      </div>

                      <div className="rounded-xl bg-gray-900 text-white p-3">
                        <div className="text-xs text-white/70">Effective</div>
                        <div className="font-semibold mt-1">{fmt(effectiveValue)}</div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {!filteredRows.length ? (
                <div className="p-6 text-sm text-slate-600">No matching items.</div>
              ) : null}
            </div>
          </div>

          {/* Desktop editor */}
          <div className="hidden lg:block lg:col-span-2">
            <EditorPanel
              tab={tab}
              editKey={editKey}
              value={value}
              setValue={setValue}
              inputRef={inputRef}
              groupOverrides={groupOverrides}
              currentDefault={currentDefault}
              onSave={save}
              onReset={reset}
              onClose={closeDrawer}
            />
          </div>
        </div>

        {/* Mobile Edit Drawer */}
        {drawerOpen ? (
          <div className="lg:hidden fixed inset-0 z-[80]">
            {/* backdrop */}
            <div
              className="absolute inset-0 bg-black/50"
              onClick={closeDrawer}
              role="button"
              aria-label="Close"
              tabIndex={-1}
            />
            {/* sheet */}
            <div className="absolute left-0 right-0 bottom-0 bg-white rounded-t-3xl p-4 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm font-semibold text-gray-900">Edit Override</div>
                  <div className="text-xs text-slate-500">Tap outside to close.</div>
                </div>
                <button
                  onClick={closeDrawer}
                  className="px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold hover:bg-gray-50"
                >
                  Close
                </button>
              </div>

              <EditorPanel
                compact
                tab={tab}
                editKey={editKey}
                value={value}
                setValue={setValue}
                inputRef={inputRef}
                groupOverrides={groupOverrides}
                currentDefault={currentDefault}
                onSave={save}
                onReset={reset}
                onClose={closeDrawer}
              />
            </div>
          </div>
        ) : null}
      </div>
    </AuthenticatedLayout>
  );
}
