import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

function getKeyMaterial() {
  const source = process.env.CONTACT_ENCRYPTION_KEY || process.env.PREVIEW_SECRET || "local-dev-secret";
  return createHash("sha256").update(source).digest();
}

export function encryptValue(value: string) {
  const iv = randomBytes(12);
  const key = getKeyMaterial();
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return Buffer.concat([iv, tag, encrypted]).toString("base64url");
}

export function decryptValue(payload: string) {
  const input = Buffer.from(payload, "base64url");
  const iv = input.subarray(0, 12);
  const tag = input.subarray(12, 28);
  const data = input.subarray(28);
  const key = getKeyMaterial();
  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  return Buffer.concat([decipher.update(data), decipher.final()]).toString("utf8");
}

export function hashValue(value: string) {
  const source = process.env.HASH_SALT || process.env.PREVIEW_SECRET || "local-dev-secret";
  return createHash("sha256").update(source).update(value).digest("hex");
}
