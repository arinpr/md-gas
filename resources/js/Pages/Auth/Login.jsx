// import Checkbox from '@/components/Checkbox';
// import InputError from '@/components/InputError';
// import InputLabel from '@/components/InputLabel';
// import PrimaryButton from '@/components/PrimaryButton';
// import TextInput from '@/components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
// import { Head, Link, useForm } from '@inertiajs/react';

// export default function Login({ status, canResetPassword }) {
//     const { data, setData, post, processing, errors, reset } = useForm({
//         email: '',
//         password: '',
//         remember: false,
//     });

//     const submit = (e) => {
//         e.preventDefault();

//         post(route('login'), {
//             onFinish: () => reset('password'),
//         });
//     };

//     return (
//         <GuestLayout>
//             <Head title="Log in" />

//             {status && (
//                 <div className="mb-4 text-sm font-medium text-green-600">
//                     {status}
//                 </div>
//             )}

//             <form onSubmit={submit}>
//                 <div>
//                     <InputLabel htmlFor="email" value="Email" />

//                     <TextInput
//                         id="email"
//                         type="email"
//                         name="email"
//                         value={data.email}
//                         className="mt-1 block w-full"
//                         autoComplete="username"
//                         isFocused={true}
//                         onChange={(e) => setData('email', e.target.value)}
//                     />

//                     <InputError message={errors.email} className="mt-2" />
//                 </div>

//                 <div className="mt-4">
//                     <InputLabel htmlFor="password" value="Password" />

//                     <TextInput
//                         id="password"
//                         type="password"
//                         name="password"
//                         value={data.password}
//                         className="mt-1 block w-full"
//                         autoComplete="current-password"
//                         onChange={(e) => setData('password', e.target.value)}
//                     />

//                     <InputError message={errors.password} className="mt-2" />
//                 </div>

//                 <div className="mt-4 block">
//                     <label className="flex items-center">
//                         <Checkbox
//                             name="remember"
//                             checked={data.remember}
//                             onChange={(e) =>
//                                 setData('remember', e.target.checked)
//                             }
//                         />
//                         <span className="ms-2 text-sm text-gray-600">
//                             Remember me
//                         </span>
//                     </label>
//                 </div>

//                 <div className="mt-4 flex items-center justify-end">
//                     {canResetPassword && (
//                         <Link
//                             href={route('password.request')}
//                             className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//                         >
//                             Forgot your password?
//                         </Link>
//                     )}

//                     <PrimaryButton className="ms-4" disabled={processing}>
//                         Log in
//                     </PrimaryButton>
//                 </div>
//             </form>
//         </GuestLayout>
//     );
// }

// import { Head, Link, useForm } from "@inertiajs/react"
// import Checkbox from "@/components/Checkbox"
// import InputError from "@/components/InputError"
// import InputLabel from "@/components/InputLabel"
// import PrimaryButton from "@/components/PrimaryButton"
// import TextInput from "@/components/TextInput"

// export default function Login({ status, canResetPassword }) {
//   const { data, setData, post, processing, errors, reset } = useForm({
//     email: "",
//     password: "",
//     remember: false,
//   })

//   const submit = (e) => {
//     e.preventDefault()
//     post(route("login"), {
//       onFinish: () => reset("password"),
//     })
//   }

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
//       <Head title="Login" />

//       <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
//         <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">
//           Login
//         </h2>

//         {status && (
//           <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
//         )}

//         <form onSubmit={submit} className="space-y-4">
//           {/* Email */}
//           <div>
//             <InputLabel htmlFor="email" value="Email" />

//             <TextInput
//               id="email"
//               type="email"
//               name="email"
//               value={data.email}
//               className="mt-1 block w-full"
//               autoComplete="username"
//               isFocused={true}
//               onChange={(e) => setData("email", e.target.value)}
//             />

//             <InputError message={errors.email} className="mt-2" />
//           </div>

//           {/* Password */}
//           <div>
//             <InputLabel htmlFor="password" value="Password" />

//             <TextInput
//               id="password"
//               type="password"
//               name="password"
//               value={data.password}
//               className="mt-1 block w-full"
//               autoComplete="current-password"
//               onChange={(e) => setData("password", e.target.value)}
//             />

//             <InputError message={errors.password} className="mt-2" />
//           </div>

//           {/* Remember */}
//           <div className="flex items-center">
//             <Checkbox
//               name="remember"
//               checked={data.remember}
//               onChange={(e) => setData("remember", e.target.checked)}
//             />
//             <span className="ml-2 text-sm text-gray-600">Remember me</span>
//           </div>

//           {/* Buttons */}
//           <div className="flex items-center justify-between pt-2">
//             {canResetPassword && (
//               <Link
//                 href={route("password.request")}
//                 className="text-sm text-blue-600 hover:underline"
//               >
//                 Forgot your password?
//               </Link>
//             )}

//             <PrimaryButton disabled={processing}>Log In</PrimaryButton>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

import { Head, Link, useForm } from "@inertiajs/react";
import Checkbox from "@/components/Checkbox";
import InputError from "@/components/InputError";
import PrimaryButton from "@/components/PrimaryButton";
import { Flame } from "lucide-react";

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), {
            onFinish: () => reset("password"),
        });
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
            <Head title="Login" />

            <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
                {/* Logo */}
                <div className="flex justify-center mb-4">
                    <div className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                            <Flame className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            MD Gas
                        </h1>
                    </div>
                </div>

                {status && (
                    <div className="mb-4 text-sm font-medium text-green-600">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    {/* Email */}
                    <div>
                        <label
                            htmlFor="email"
                            className="text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>

                        <input
                            id="email"
                            type="email"
                            value={data.email}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                            onChange={(e) => setData("email", e.target.value)}
                        />

                        <InputError message={errors.email} className="mt-2" />
                    </div>

                    {/* Password */}
                    <div>
                        <label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>

                        <input
                            id="password"
                            type="password"
                            value={data.password}
                            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 text-gray-900 focus:border-blue-600 focus:ring-blue-600"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData("remember", e.target.checked)
                            }
                        />
                        <span className="ml-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                        {canResetPassword && (
                            <Link
                                href={route("password.request")}
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot Password?
                            </Link>
                        )}

                        <PrimaryButton disabled={processing}>
                            Log In
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </div>
    );
}
