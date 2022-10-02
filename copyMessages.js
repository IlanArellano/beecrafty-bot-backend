const fs = require("fs");
const path = require("path");


const dist = fs.readdirSync(path.join(__dirname, "dist"))

if(dist.length > 0)
  fs.copyFileSync(path.join(__dirname, "src", "messages", "messages.json"), path.join(__dirname, "dist", "messages", "messages.json"));