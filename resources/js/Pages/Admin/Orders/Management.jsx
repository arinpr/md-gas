import React, { useMemo, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const cn = (...c) => c.filter(Boolean).join(" ");

function money(amount, currency = "GBP") {
  const n = Number(amount || 0);
  try {
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${currency} ${n.toFixed(2)}`;
  }
}

function formatUkDateTime(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}

function formatUkDate(value) {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return String(value); // if already a date string
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d);
}

function Badge({ children, tone = "slate" }) {
  const map = {
    slate: "bg-slate-100 text-slate-700 border-slate-200",
    green: "bg-green-100 text-green-700 border-green-200",
    yellow: "bg-yellow-100 text-yellow-800 border-yellow-200",
    red: "bg-red-100 text-red-700 border-red-200",
    blue: "bg-blue-100 text-blue-700 border-blue-200",
    purple: "bg-purple-100 text-purple-700 border-purple-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium",
        map[tone] || map.slate
      )}
    >
      {children}
    </span>
  );
}

function SmallButton({ children, ...props }) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-lg border px-3 py-1.5 text-sm font-semibold",
        "bg-white hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed",
        props.className
      )}
    >
      {children}
    </button>
  );
}

function CopyText({ value }) {
  const [ok, setOk] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value || "");
      setOk(true);
      setTimeout(() => setOk(false), 900);
    } catch {
      // silent
    }
  };

  if (!value) return <span className="text-slate-400">—</span>;

  return (
    <div className="flex items-center gap-2">
      <span className="truncate">{value}</span>
      <button
        type="button"
        onClick={copy}
        className="rounded border px-2 py-0.5 text-xs hover:bg-slate-50"
        title="Copy"
      >
        {ok ? "Copied" : "Copy"}
      </button>
    </div>
  );
}

/**
 * Normal bottom pagination:
 * - Mobile: Prev / Next + current page
 * - Desktop: Laravel links
 */
function Pagination({ meta, links }) {
  if (!meta || !links) return null;

  const current = meta.current_page || 1;
  const last = meta.last_page || 1;

  const prevUrl = links.find((l) => l.label?.toLowerCase?.().includes("previous"))?.url || null;
  const nextUrl = links.find((l) => l.label?.toLowerCase?.().includes("next"))?.url || null;

  return (
    <div className="flex flex-col gap-3 border-t bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-slate-600">
        Showing <span className="font-medium">{meta.from || 0}</span> to{" "}
        <span className="font-medium">{meta.to || 0}</span> of{" "}
        <span className="font-medium">{meta.total || 0}</span>
      </div>

      {/* Mobile */}
      <div className="flex items-center justify-between gap-2 sm:hidden">
        <SmallButton disabled={!prevUrl} onClick={() => prevUrl && router.visit(prevUrl)}>
          Prev
        </SmallButton>
        <div className="text-sm text-slate-600">
          Page <span className="font-semibold">{current}</span> / {last}
        </div>
        <SmallButton disabled={!nextUrl} onClick={() => nextUrl && router.visit(nextUrl)}>
          Next
        </SmallButton>
      </div>

      {/* Desktop */}
      <div className="hidden items-center gap-2 sm:flex">
        {links.map((l, idx) => {
          const isDisabled = !l.url;
          const isActive = l.active;

          return (
            <button
              key={idx}
              type="button"
              disabled={isDisabled}
              onClick={() => l.url && router.visit(l.url)}
              className={cn(
                "rounded-lg border px-3 py-1.5 text-sm",
                isActive && "bg-slate-900 text-white border-slate-900",
                !isActive && "bg-white hover:bg-slate-50",
                isDisabled && "opacity-40 cursor-not-allowed"
              )}
              dangerouslySetInnerHTML={{ __html: l.label }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Management() {
  const { bookings, filters, flash } = usePage().props;

  const [openId, setOpenId] = useState(null);
  const [savingId, setSavingId] = useState(null);

  const rows = useMemo(() => bookings?.data || [], [bookings]);

  const onSearch = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    router.get(
      "/admin/order/management",
      {
        q: fd.get("q") || "",
        per_page: fd.get("per_page") || 10,
      },
      { preserveScroll: true, preserveState: true, replace: true }
    );
  };

  const updateStatus = (bookingId, payload) => {
    setSavingId(bookingId);
    router.put(
      route("admin.orders.management.status", bookingId),
      payload,
      {
        preserveScroll: true,
        onFinish: () => setSavingId(null),
      }
    );
  };

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Order Management
        </h2>
      }
    >
      <div className="min-h-screen bg-slate-50">
        <div className="mx-auto max-w-6xl px-3 py-5 sm:px-4 sm:py-6">
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            {/* <div>
              <h1 className="text-xl font-semibold text-slate-900">Order Management</h1>
              <p className="text-sm text-slate-600">
                Review bookings, appointments, answers, and transactions.
              </p>
            </div> */}

            {flash?.success ? (
              <div className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                {flash.success}
              </div>
            ) : null}
          </div>

          {/* Filters */}
          <form onSubmit={onSearch} className="mb-5 rounded-2xl border bg-white p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_180px_140px]">
              <input
                name="q"
                defaultValue={filters?.q || ""}
                placeholder="Search by customer name, email, phone…"
                className="w-full rounded-lg border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />

              <select
                name="per_page"
                defaultValue={filters?.per_page || 10}
                className="w-full rounded-lg border px-3 py-2 text-sm"
              >
                <option value={10}>10 / page</option>
                <option value={15}>15 / page</option>
                <option value={25}>25 / page</option>
                <option value={50}>50 / page</option>
              </select>

              <button
                type="submit"
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Apply
              </button>
            </div>
          </form>

          {/* List */}
          <div className="space-y-4">
            {rows.length === 0 ? (
              <div className="rounded-2xl border bg-white p-6 text-sm text-slate-600">
                No bookings found.
              </div>
            ) : (
              rows.map((b) => {
                const isOpen = openId === b.id;

                const paymentTone =
                  b.payment_status === "paid" ? "green" :
                  b.payment_status === "pending" ? "yellow" :
                  b.payment_status === "failed" ? "red" :
                  b.payment_status === "refunded" ? "purple" : "slate";

                const apptStatus = b.appointment?.status || "—";
                const apptTone =
                  apptStatus === "confirmed" ? "green" :
                  apptStatus === "pending" ? "yellow" :
                  apptStatus === "cancelled" ? "red" :
                  apptStatus === "completed" ? "blue" :
                  apptStatus === "no_show" ? "purple" : "slate";
                console.log("Customer Services", b.appointment);
                const serviceName =
                  b.appointment?.service?.service ||
                  b.appointment?.service?.service ||
                  b.appointment?.type ||
                  "—";

                const basePrice =
                  b.total;

                const appointmentTime = b.appointment?.starts_at
                  ? formatUkDateTime(b.appointment.starts_at)
                  : (b.appointment?.appointment_date ? formatUkDate(b.appointment.appointment_date) : "—");

                return (
                  <div key={b.id} className="rounded-2xl border bg-white">
                    {/* Header */}
                    <div className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <div className="text-sm font-semibold text-slate-900">
                            Booking #{b.id}
                          </div>

                          <Badge tone={paymentTone}>Payment: {b.payment_status || "—"}</Badge>
                          <Badge tone={apptTone}>Appointment: {apptStatus}</Badge>

                          <Badge tone="blue">
                            {serviceName}
                            {basePrice != null ? ` • ${money(basePrice, b.currency)}` : ""}
                          </Badge>
                        </div>

                        <div className="mt-2 grid grid-cols-1 gap-1 text-sm text-slate-600 sm:grid-cols-3">
                          <div className="truncate">
                            <span className="text-slate-500">Customer:</span>{" "}
                            <span className="font-medium text-slate-800">
                              {b.customer?.full_name || "—"}
                            </span>{" "}
                            <span className="text-slate-400">({b.customer?.email || "—"})</span>
                          </div>

                          <div className="truncate">
                            <span className="text-slate-500">Visit:</span>{" "}
                            <span className="font-medium text-slate-800">{appointmentTime}</span>
                          </div>

                          <div>
                            <span className="text-slate-500">Total:</span>{" "}
                            <span className="font-semibold text-slate-900">
                              {money(b.total, b.currency)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <SmallButton onClick={() => setOpenId(isOpen ? null : b.id)}>
                          {isOpen ? "Hide details" : "View details"}
                        </SmallButton>
                      </div>
                    </div>

                    {/* Details */}
                    {isOpen && (
                      <div className="border-t bg-slate-50 p-4">
                        {/* Status controls */}
                        <div className="mb-4 rounded-xl border bg-white p-4">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                              <div className="text-sm font-semibold text-slate-900">Quick Actions</div>
                              <div className="text-xs text-slate-500">
                                Update status without leaving this screen.
                              </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                              <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-slate-600">Payment status</label>
                                <select
                                  defaultValue={b.payment_status || "pending"}
                                  className="w-full rounded-lg border px-3 py-2 text-sm sm:w-[200px]"
                                  disabled={savingId === b.id}
                                  onChange={(e) =>
                                    updateStatus(b.id, { payment_status: e.target.value })
                                  }
                                >
                                  <option value="pending">pending</option>
                                  <option value="paid">paid</option>
                                  <option value="failed">failed</option>
                                  <option value="refunded">refunded</option>
                                  <option value="cancelled">cancelled</option>
                                </select>
                              </div>

                              <div className="flex flex-col gap-1">
                                <label className="text-xs font-medium text-slate-600">Appointment status</label>
                                <select
                                  defaultValue={apptStatus === "—" ? "pending" : apptStatus}
                                  className="w-full rounded-lg border px-3 py-2 text-sm sm:w-[220px]"
                                  disabled={savingId === b.id || !b.appointment}
                                  onChange={(e) =>
                                    updateStatus(b.id, { appointment_status: e.target.value })
                                  }
                                >
                                  <option value="pending">pending</option>
                                  <option value="confirmed">confirmed</option>
                                  <option value="completed">completed</option>
                                  <option value="cancelled">cancelled</option>
                                  <option value="no_show">no_show</option>
                                </select>
                              </div>

                              <div className="text-sm text-slate-500">
                                {savingId === b.id ? "Saving…" : ""}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          {/* Customer */}
                          <div className="rounded-xl border bg-white p-4">
                            <div className="mb-2 text-sm font-semibold text-slate-900">Customer</div>
                            <div className="space-y-1 text-sm text-slate-700">
                              <div><span className="text-slate-500">Name:</span> {b.customer?.full_name || "—"}</div>
                              <div><span className="text-slate-500">Email:</span> {b.customer?.email || "—"}</div>
                              <div><span className="text-slate-500">Phone:</span> {b.customer?.phone || "—"}</div>
                              <div><span className="text-slate-500">Postcode:</span> {b.customer?.postcode || "—"}</div>
                              <div><span className="text-slate-500">Address:</span> {b.customer?.address_full || "—"}</div>
                            </div>
                          </div>

                          {/* Appointment */}
                          <div className="rounded-xl border bg-white p-4">
                            <div className="mb-2 text-sm font-semibold text-slate-900">Appointment</div>
                            <div className="space-y-1 text-sm text-slate-700">
                              <div>
                                <span className="text-slate-500">Service:</span>{" "}
                                {serviceName}
                                {basePrice != null ? (
                                  <span className="text-slate-500"> • Base: {money(basePrice, b.currency)}</span>
                                ) : null}
                              </div>
                              <div><span className="text-slate-500">Service key:</span> {b.appointment?.service_key || "—"}</div>
                              <div><span className="text-slate-500">Date:</span> {b.appointment?.appointment_date ? formatUkDate(b.appointment.appointment_date) : "—"}</div>
                              <div><span className="text-slate-500">Starts at:</span> {b.appointment?.starts_at ? formatUkDateTime(b.appointment.starts_at) : "—"}</div>
                              <div><span className="text-slate-500">Status:</span> {apptStatus}</div>
                            </div>
                          </div>

                          {/* Q/A */}
                          <div className="rounded-xl border bg-white p-4 sm:col-span-2">
                            <div className="mb-2 text-sm font-semibold text-slate-900">Booking Details (Q/A)</div>
                            {(!b.details || b.details.length === 0) ? (
                              <div className="text-sm text-slate-600">No details found.</div>
                            ) : (
                              <div className="divide-y rounded-lg border">
                                {b.details.map((d) => {
                                  const answer =
                                    d.answer_text ??
                                    (d.answer_json ? JSON.stringify(d.answer_json) : null) ??
                                    (d.media ? JSON.stringify(d.media) : "—");

                                  return (
                                    <div key={d.id} className="p-3">
                                      <div className="text-sm font-medium text-slate-900">
                                        {d.question_snapshot || d.frontend_key}
                                      </div>
                                      <div className="mt-1 text-sm text-slate-700 break-words">
                                        {answer || "—"}
                                      </div>
                                      {d.amount ? (
                                        <div className="mt-1 text-xs text-slate-500">
                                          Amount impact: {money(d.amount, b.currency)}
                                        </div>
                                      ) : null}
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Transactions */}
                          <div className="rounded-xl border bg-white p-4 sm:col-span-2">
                            <div className="mb-2 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                              <div className="text-sm font-semibold text-slate-900">Transactions</div>
                              <div className="text-xs text-slate-500">
                                Tip: copy IDs for support/debugging.
                              </div>
                            </div>

                            {(!b.transactions || b.transactions.length === 0) ? (
                              <div className="text-sm text-slate-600">No transactions found.</div>
                            ) : (
                              <div className="overflow-x-auto rounded-lg border">
                                <table className="min-w-full text-left text-sm">
                                  <thead className="bg-slate-50 text-slate-600">
                                    <tr>
                                      <th className="px-3 py-2 whitespace-nowrap">Status</th>
                                      <th className="px-3 py-2 whitespace-nowrap">Amount</th>
                                      <th className="px-3 py-2 whitespace-nowrap">Provider</th>
                                      <th className="px-3 py-2 whitespace-nowrap">Kind</th>
                                      <th className="px-3 py-2 whitespace-nowrap">Session</th>
                                      <th className="px-3 py-2 whitespace-nowrap">PaymentIntent</th>
                                      <th className="px-3 py-2 whitespace-nowrap">Charge</th>
                                      <th className="px-3 py-2 whitespace-nowrap">Refund</th>
                                      <th className="px-3 py-2 whitespace-nowrap">Created</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {b.transactions.map((t) => (
                                      <tr key={t.id} className="border-t align-top">
                                        <td className="px-3 py-2">
                                          <Badge
                                            tone={
                                              t.status === "succeeded" ? "green" :
                                              t.status === "processing" ? "yellow" :
                                              t.status === "failed" ? "red" : "slate"
                                            }
                                          >
                                            {t.status || "—"}
                                          </Badge>
                                        </td>
                                        <td className="px-3 py-2 whitespace-nowrap">
                                          {money(t.amount, t.currency)}
                                        </td>
                                        <td className="px-3 py-2">{t.provider || "—"}</td>
                                        <td className="px-3 py-2">{t.kind || "—"}</td>

                                        <td className="px-3 py-2 text-xs text-slate-700">
                                          <CopyText value={t.provider_checkout_session_id} />
                                        </td>
                                        <td className="px-3 py-2 text-xs text-slate-700">
                                          <CopyText value={t.provider_payment_intent_id} />
                                        </td>
                                        <td className="px-3 py-2 text-xs text-slate-700">
                                          <CopyText value={t.provider_charge_id} />
                                        </td>
                                        <td className="px-3 py-2 text-xs text-slate-700">
                                          <CopyText value={t.provider_refund_id} />
                                        </td>

                                        <td className="px-3 py-2 text-xs text-slate-600 whitespace-nowrap">
                                          {t.created_at ? formatUkDateTime(t.created_at) : "—"}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Normal bottom pagination */}
          <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
            <Pagination meta={bookings?.meta} links={bookings?.links} />
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
