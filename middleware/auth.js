import passport from "passport";
import { Issuer, Strategy } from "openid-client";

// Función para configurar `passport`
export async function setupPassport() {
  const realm = process.env.KEYCLOAK_REALM;
  try {
    const keycloakIssuer = await Issuer.discover(
      `https://login.colegioae.edu.pe/realms/${realm}/.well-known/openid-configuration`
    );

    const client = new keycloakIssuer.Client({
      client_id: "test-login",
      client_secret: "nbNCSQH89KwoyOO7GYQekR14dfsw9tAe",
      // redirect_uris: ["http://localhost:3000/callback"], // Ajusta a tu URI de redirección
      // response_types: ["code"],
    });

    // Configura la estrategia de Passport con OpenID Connect
    passport.use(
      "oidc",
      new Strategy(
        {
          client,
          params: {
            scope: "openid profile email", // Ajusta los scopes que necesites
          },
        },
        (tokenset, userinfo, done) => {
          return done(null, userinfo);
        }
      )
    );

    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
  } catch (error) {
    console.error("Error configurando passport:", error);
  }
}

export default passport;
