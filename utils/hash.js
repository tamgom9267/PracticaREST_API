import crypto from "crypto";

const PEPPER = process.env.PEPPER || "pepper_default_simple";

export const getSalt = () => crypto.randomBytes(16).toString("hex");

export const hashPassword = (password, salt) => {
  const hash = crypto.pbkdf2Sync(password + PEPPER, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
};

export const verifyPassword = (password, storedPassword) => {
  if (!storedPassword) return false;

  if (storedPassword.includes(":")) {
    const [salt, originalHash] = storedPassword.split(":");
    const hash = crypto.pbkdf2Sync(password + PEPPER, salt, 100000, 64, "sha512").toString("hex");
    return hash === originalHash;
  }

  return password === storedPassword;
};
