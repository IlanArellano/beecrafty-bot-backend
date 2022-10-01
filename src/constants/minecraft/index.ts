export const MINECRAFT_WHITELIST_ALREADY_SET: Readonly<string> =
  "Player is already whitelisted";

//MYSQL Queries
export const MINECRAFT_MYSQL_USER_QUERIES: Readonly<Record<string, string>> = {
  select_by_discord_id: "SELECT * FROM users WHERE discord_id = ?",
  select_by_public_ip: "SELECT * FROM users WHERE public_ip = ?",
  insert_user:
    "INSERT INTO users (username, discord_id, public_ip, mode, created_at) VALUES (?,?,?,?, NOW())",
};
