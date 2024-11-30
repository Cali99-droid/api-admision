import jwt from "jsonwebtoken";
import jwksClient from "jwks-rsa";
import { saveUserIdIfNotExists } from "../helpers/sincronizeUser.js";

// Configuración del cliente JWKS para obtener la clave pública de Keycloak
const client = jwksClient({
  jwksUri:
    "https://login.colegioae.edu.pe/realms/test-login/protocol/openid-connect/certs", // Cambia esto por la URL correcta
});

// Función para obtener la clave pública adecuada
function getKey(header, callback) {
  client.getSigningKey(header.kid, (err, key) => {
    const signingKey = key.getPublicKey();
    callback(null, signingKey);
  });
}

// Middleware para validar el token
export function ensureAuthenticated(requiredRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado." });
    }

    jwt.verify(
      token,
      getKey,
      { algorithms: ["RS256"] },
      (err, decodedToken) => {
        if (err) {
          console.error("Error verifying token:", err);
          return res.status(401).json({ message: "No autenticado." });
        }

        // Extrae los roles del token JWTs
        const userRoles =
          decodedToken.resource_access[process.env.KEYCLOAK_RESOURCE]?.roles ||
          [];

        // Valida si el usuario tiene al menos uno de los roles requeridos
        const hasRequiredRole =
          requiredRoles.length === 0 ||
          requiredRoles.some((role) => userRoles.includes(role));

        if (!hasRequiredRole) {
          return res
            .status(403)
            .json({ message: "Acceso denegado. Rol no autorizado." });
        }

        saveUserIdIfNotExists(decodedToken)
          .then((us) => {
            // Añadir el userId al request para acceder en rutas posteriores
            decodedToken.userId = us.id;
            decodedToken.personId = us.person_id;
            req.user = decodedToken;
            next();
          })
          .catch((error) => {
            console.error("Error guardando el usuario en la BD:", error);
            res.status(500).json({ message: "Error guardando usuario" });
          });

        // Guarda la información del usuario en la solicitud
        // req.user = decodedToken;

        // next();
      }
    );
  };
}
