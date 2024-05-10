import { Client } from "@passwordlessdev/passwordless-client";

export const passwordless = new Client({
    apiKey: import.meta.env.VITE_PASSKEY_PUBLIC_KEY
})
