export const MINECRAFT_WHITELIST_ALREADY_SET: Readonly<string> =
  "Player is already whitelisted";
export const MINECRAFT_WHITELIST_NOT_FOUND: Readonly<string> =
  "Player is not whitelisted";

//MYSQL Queries
export const MINECRAFT_MYSQL_USER_QUERIES: Readonly<Record<string, string>> = {
  select_by_discord_id: "SELECT * FROM users WHERE discord_id = ?",
  select_by_public_ip: "SELECT * FROM users WHERE public_ip = ?",
  insert_user:
    "INSERT INTO users (username, discord_id, public_ip, mode, active = 1, created_at) VALUES (?,?,?,?, NOW())",
  inactive_user:
    "UPDATE users SET active = 0, inactive_reason = ? WHERE discord_id = ?",
  active_user:
    "UPDATE users SET active = 1, attempts = ?, username = ?, public_ip = ?, mode = ?, inactive_reason = NULL WHERE discord_id = ?",
};
