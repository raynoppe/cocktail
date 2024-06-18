import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth/next";
export const allowedAdminAccess = async (): Promise<Boolean> => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return false;
    }
    if (session.user.user_type === 'user') {
        return false;
    }
    return true;
}