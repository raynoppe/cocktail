import Image from "next/image";
import Link from "next/link";
import Form from "../_components/form";

export default function Login() {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-700">
            <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-xl">
                <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 px-4 py-6 pt-8 text-center sm:px-16">
                    <Link href="/">
                        My Startup
                    </Link>
                    <h3 className="text-xl font-semibold">Sign Up</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-300">
                        Create an account with your email and password
                    </p>
                </div>
                <Form type="register" />
            </div>
        </div>
    );
}
