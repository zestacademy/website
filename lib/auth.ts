import type { AuthOptions } from "next-auth"

export const authOptions: AuthOptions = {
    providers: [
        {
            id: "zest-auth",
            name: "Zest ID",
            type: "oauth",
            wellKnown: `${process.env.ZEST_AUTH_ISSUER}/.well-known/openid-configuration`,
            authorization: { params: { scope: "openid profile email" } },
            clientId: process.env.ZEST_CLIENT_ID || "zest-client",
            clientSecret: process.env.ZEST_CLIENT_SECRET || "zest-client-secret",
            idToken: true,
            checks: ["pkce", "state"],
            profile(profile) {
                return {
                    id: profile.sub,
                    name: profile.name,
                    email: profile.email,
                    image: profile.picture,
                }
            },
        },
    ],
    callbacks: {
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token }) {
            // @ts-ignore
            session.accessToken = token.accessToken
            return session
        },
    },
}
