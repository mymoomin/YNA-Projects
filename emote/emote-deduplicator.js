import { readFileSync, writeFileSync } from "fs";

let text = readFileSync("./Emote List.yna", "utf8");
const lines = text.split("\n");

const usedEmotes = [];

for (let i = 0; i < lines.length; i++) {
    if (/^\W*$/.test(lines[i]) || lines[i][1] === "!") continue;
    const emote = lines[i].match(/;\w+;/)[0];
    if (usedEmotes.includes(emote)) {
        lines[i] = "remove";
    } else {
        usedEmotes.push(emote);
    }
}

const newText = lines.filter((line) => line !== "remove").join("\n");

writeFileSync("./Unique Emotes.yna", newText);
