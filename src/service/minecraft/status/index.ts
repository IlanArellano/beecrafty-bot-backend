export const getIconURL = (
  uuid: string = process.env.STEVE_UUID_PLAYER,
  overlay: boolean = false
): string => {
  let url = process.env.MINECRAFT_ICON_URL + uuid;
  if (overlay) url = `${url}?overlay=true`;
  return url;
};
