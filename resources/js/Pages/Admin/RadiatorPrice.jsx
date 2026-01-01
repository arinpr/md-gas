import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { usePage } from '@inertiajs/react';

export default function RadiatorPrice({ radiators = [] }) {

    const { currencySymbol } = usePage().props;

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form state
    const { data, setData, post, processing, errors, reset } = useForm({
        label: '',
        price: '',
    });

    // Open modal
    const openEditModal = (item) => {
        setEditingItem(item);
        setData({
            label: item.label,
            price: item.price,
        });
        setShowModal(true);
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
        setEditingItem(null);
        reset();
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Radiator Pricing
                </h2>
            }
        >
            <Head title="Radiator Pricing" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">

                            {/* TABLE */}
                            <table className="min-w-full border">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2 text-left">
                                            Radiator Range
                                        </th>
                                        <th className="border px-4 py-2 text-left">
                                            Price
                                        </th>
                                        <th className="border px-6 py-3 text-center">
                                            Edit
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {radiators.map((item) => (
                                        <tr key={item.id}>
                                            <td className="border px-4 py-2">
                                                {item.label}
                                            </td>

                                            <td className="border px-4 py-2 font-semibold">
                                                {currencySymbol} {item.price}
                                            </td>

                                            <td className="border px-6 py-3 text-center">
                                                <button
                                                    className="inline-flex items-center rounded-lg
                                                    bg-indigo-50 px-3 py-1.5 text-sm font-medium
                                                    text-indigo-600 hover:bg-indigo-100 transition"
                                                    onClick={() => openEditModal(item)}
                                                >
                                                    Edit
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                    <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

                        <h3 className="text-lg font-semibold mb-4">
                            Edit Radiator Price
                        </h3>

                        {/* Label (read-only) */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Radiator Range
                            </label>
                            <input
                                type="text"
                                value={data.label}
                                disabled
                                className="mt-1 w-full rounded-lg border-gray-300 bg-gray-100"
                            />
                        </div>

                        {/* Price */}
                        <div className="mb-4">
                            <label className="block text-sm font-medium text-gray-700">
                                Price ({currencySymbol})
                            </label>

                            <input
                                type="number"
                                value={data.price}
                                onChange={(e) => setData('price', e.target.value)}
                                className="mt-1 w-full rounded-lg border border-gray-300"
                            />

                            {errors.price && (
                                <p className="text-sm text-red-600 mt-1">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={closeModal}
                                className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                disabled={processing}
                                onClick={() =>
                                    post(route('pricing.radiators.update', editingItem.id), {
                                        onSuccess: () => closeModal(),
                                    })
                                }
                                className="rounded-lg bg-indigo-600 px-4 py-2 text-sm
                                font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
                            >
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
