import NextAuth from "next-auth";
import OktaProvider from "next-auth/providers/okta";

/**
 * why use jwt instead of default sessions?
 * how to decode jwt token?
 * are Okta groups in decoded token?
 */

/**
 * how to decode nextauth jwt token?
 */

/**
 * how to add extra user info to Okta token?
 * 1. Profile fields can be added to groups and apps.
 */

const options = {
  callbacks: {
    async jwt({ token, idToken, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      return session;
    },
  },

  // jwt: {
  //   secret: process.env.JWT_SECRET,
  // },

  // Configure one or more authentication providers
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENTID,
      clientSecret: process.env.OKTA_CLIENTSECRET,
      issuer: process.env.OKTA_ISSUER,
      // This will be a thin token because both access and id tokens are being returned
      // see: https://developer.okta.com/docs/concepts/api-access-management/#tokens-and-scopes
      idToken: true,
    }),
    // ...add more providers here
  ],

  secret: process.env.JWT_SECRET,

  session: {
    // maxAge: 60 * 60 * 24 * 1,
    strategy: "jwt",
  },
};

export default (req, res) => NextAuth(req, res, options);
