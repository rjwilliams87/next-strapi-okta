import OktaJwtVerifier from "@okta/jwt-verifier";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

const oktaJwtVerifier = new OktaJwtVerifier({
  issuer: process.env.OKTA_ISSUER, // required
  clientId: process.env.OKTA_CLIENTID,
});

export default async function handler(req, res) {
  try {
    const { accessToken = null, idToken = null } = await getToken({
      req,
      secret,
    });

    if (!accessToken) {
      res.status(401).send({
        message: "Unauthorized",
        reason: "Invalid or missing access token",
        location: "/api/auth/okta/identity",
      });
    }

    let jwt;
    try {
      jwt = await oktaJwtVerifier.verifyAccessToken(
        accessToken,
        "api://default"
      );
    } catch (error) {
      console.log("Cannot verify okta access token");
      throw new Error("Invalid Okta access token");
    }

    res.status(200).send(JSON.stringify(accessToken, null, 2));
  } catch (error) {
    res.status(500).send({
      message: "Internal server error",
      location: "/api/auth/okta/identity",
    });
  }
}
