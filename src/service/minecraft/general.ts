const username_regex: RegExp = /^[a-zA-Z0-9_]{2,16}$/;

export const isValidMinecraftUsername = (username: string): boolean =>
  username_regex.test(username);
