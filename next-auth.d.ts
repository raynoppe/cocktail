import { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
    interface User extends DefaultUser {
        id: string,
        user_type: string,
    }

    interface Session {
        user: {
            id: string,
            user_type: string,
        } & DefaultSession
    }
}

declare module "next-auth/jwt" {
    interface JWT extends DefaultJWT {
        id: string,
        user_type: string,
    }
}