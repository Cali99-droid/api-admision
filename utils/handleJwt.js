import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
// const getProperties = require("../utils/handlePropertiesEngine");
// const propertiesKey = getProperties();
/**
 * Debes de pasar el objecto del usario
 * @param {*} user
 */
export const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      id: user.id,
      role: user.role,
      doc_number: user.doc_number,
      role_parent: user.role_parent,
    },
    JWT_SECRET,
    {
      expiresIn: "12h",
    }
  );

  return sign;
};

/**
 * Debes de pasar el token de session el JWT
 * @param {*} tokenJwt
 * @returns
 */
export const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    return null;
  }
};
