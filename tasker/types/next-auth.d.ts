import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            name?: string;
            email?: string;
            image?: string;
        };
    }
}

// Extend the JWT type
declare module "next-auth/jwt" {
    interface JWT {
        id: string;
    }
}
