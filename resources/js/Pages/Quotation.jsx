import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Quotation() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    New Quotation Update
                </h2>
            }
        >
            <Head title="New Quotation Update" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {/* Content goes here */}
                            New quotation update page
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
