import { Issuer } from "openid-client";
import dotenv from "dotenv";
dotenv.config();

const keycloakIssuer = await Issuer.discover(
  `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/test-login`
);

const client = new keycloakIssuer.Client({
  client_id: process.env.KEYCLOAK_RESOURCE,
  client_secret: process.env.KEYCLOAK_CREDENTIALS_SECRET,
  redirect_uris: [`${process.env.SERVER_URL}/auth/callback`],
  post_logout_redirect_uris: [`${process.env.SERVER_URL}auth/logout/callback`],
  response_types: ["code"],
});

export default client;
