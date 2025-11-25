// src/utils/tokenStorage.ts
import { UserResponse } from "@/api/authenticationService/login";
import * as SecureStore from "expo-secure-store";

const ACCESS_TOKEN_KEY = "ACCESS_TOKEN";
const USER_KEY = "USER_INFO";

async function isSecureStoreAvailable() {
  try {
    return await SecureStore.isAvailableAsync();
  } catch {
    return false;
  }
}

/* ================================
   TOKEN
================================ */

export async function saveSecureToken(token: string) {
  try {
    const ok = await isSecureStoreAvailable();
    if (!ok) return;

    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, token);
  } catch (e) {
    console.log("Error saving token:", e);
  }
}

export async function getSecureToken(): Promise<string | null> {
  try {
    const ok = await isSecureStoreAvailable();
    if (!ok) return null;

    return await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  } catch (e) {
    console.log("Error reading token:", e);
    return null;
  }
}

export async function removeSecureToken() {
  try {
    const ok = await isSecureStoreAvailable();
    if (!ok) return;

    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  } catch (e) {
    console.log("Error removing token:", e);
  }
}

/* ================================
   USER
================================ */

export async function saveSecureUser(user: UserResponse) {
  try {
    const ok = await isSecureStoreAvailable();
    if (!ok) return;

    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.log("Error saving user:", e);
  }
}

export async function getSecureUser<T = any>(): Promise<T | null> {
  try {
    const ok = await isSecureStoreAvailable();
    if (!ok) return null;

    const stored = await SecureStore.getItemAsync(USER_KEY);
    if (!stored) return null;

    return JSON.parse(stored) as T;
  } catch (e) {
    console.log("Error reading user:", e);
    return null;
  }
}

export async function removeSecureUser() {
  try {
    const ok = await isSecureStoreAvailable();
    if (!ok) return;

    await SecureStore.deleteItemAsync(USER_KEY);
  } catch (e) {
    console.log("Error removing user:", e);
  }
}
