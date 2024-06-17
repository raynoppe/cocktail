import { getServerSession } from "next-auth/next";
import SignOut from "./sign-out";


export default async function AuthStatus() {
    const session = await getServerSession();
    return (
        <div className="">
            {session && (
                <div className=" p-2 bg-slate-500 rounded-lg mb-2 text-white">
                    <p className=" text-sm">
                        Signed in as {session.user?.email}
                    </p>
                    <SignOut />
                </div>

            )}
        </div>
    );
}
