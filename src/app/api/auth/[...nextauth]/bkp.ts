import NextAuth, { DefaultSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

declare module "next-auth" {
    interface User {
        id: string;
        name: string | null;
        email: string;
        password: string;
        emailVerified: Date | null;
        image: string | null;
        user_type: string | null;
        createdAt: Date;
        updatedAt: Date;
    }

    interface session {
        user: {
            id: string;
            user_type: string | null;
        } & DefaultSession["user"];
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {};
                if (!email || !password) {
                    throw new Error("Missing username or password");
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                });
                // if user doesn't exist or password doesn't match
                if (!user || !(await compare(password, user.password))) {
                    throw new Error("Invalid username or password");
                }
                return user;
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.user_type = user.user_type;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user && token) {
                session.user.id = token.id as string;
                session.user.user_type = token.user_type as string | null;
            }
            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };