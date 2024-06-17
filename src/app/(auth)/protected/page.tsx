
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
export default async function Protected() {
    const session = await getServerSession(authOptions);
    console.log("session", session);
    return (
        <>
            <div>content 2</div>
        </>
    )
}