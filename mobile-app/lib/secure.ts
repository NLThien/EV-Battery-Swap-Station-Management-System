import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "access_token";

export async function saveToken(token: string) {
  // iOS sẽ dùng Keychain, Android dùng EncryptedSharedPreferences
  await SecureStore.setItemAsync(TOKEN_KEY, token, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY,
  });
}

export async function getToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function deleteToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
