import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { FiXCircle } from "react-icons/fi";

export default function Cancelled() {
  const { booking } = usePage().props;

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-500">
          <FiXCircle className="h-7 w-7 text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900">Payment cancelled</h1>
        <p className="mt-2 text-sm text-gray-600">
          No charges were made. You can restart checkout anytime.
        </p>

        <div className="mt-6 rounded-2xl bg-gray-50 p-4 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Booking ID</span>
            <span className="font-medium text-gray-900">#{booking?.id}</span>
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/"
            className="w-full rounded-2xl border border-gray-200 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 text-center"
          >
            Go home
          </Link>

          {/* Change this to your actual retry page/flow */}
          <Link
            href="/"
            className="w-full rounded-2xl bg-primary py-3 text-sm font-semibold text-white hover:opacity-90 text-center"
          >
            Restart
          </Link>
        </div>
      </div>
    </div>
  );
}
