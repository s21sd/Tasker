import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Attach user ID from token to session object
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user, account }) {
            // Add user ID to token if user object is present
            if (user) {
                token.id = user.id;
            }
            return token;
        },
    },
    secret: process.env.NEXTAUTH_SECRET, // Optional but recommended for security
});

export { handler as GET, handler as POST };
