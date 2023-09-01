import { createHash } from "crypto";

const salt = 'random-private-key';

export const hashPassword = async (password: string): Promise<string> => {
  return await createHash('sha256').update(`${password}.${salt}`).digest('hex');
}

export const isPasswordMatch = async (hash: string, password: string): Promise<boolean> => {
  return hash === await hashPassword(password);
}
