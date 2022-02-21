import * as fs from 'fs';
import * as path from 'path';

const file = fs.readFileSync(path.join(`${__dirname}/messages.json`), 'utf8');

export const Messages = JSON.parse(file);