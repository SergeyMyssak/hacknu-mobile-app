import * as Keychain from 'react-native-keychain';

export const setSecureValue = (key, value): Promise<false | Keychain.Result> =>
  Keychain.setInternetCredentials(key, key, value);

export const getSecureValue = async (key): Promise<string | undefined> => {
  const result = await Keychain.getInternetCredentials(key);
  if (result) {
    return result.password;
  }
};

export const removeSecureValue = (key): Promise<void> => Keychain.resetInternetCredentials(key);
