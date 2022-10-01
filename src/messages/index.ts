import * as fs from "fs";
import * as path from "path";

const file: string = fs.readFileSync(
  path.join(`${__dirname}/messages.json`),
  "utf8"
);

const Messages: Record<string, string> = JSON.parse(file);

export default Messages;
