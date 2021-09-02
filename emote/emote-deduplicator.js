import { readFileSync, writeFileSync } from "fs";

let text = readFileSync("./Emote List.yna", "utf8");
const lines = text.split("\n");

const emoteUrls = [];

const usedEmotes = [];
const urls = [];

for (let i = 0; i < lines.length; i++) {
    if (/^\W*$/.test(lines[i]) || lines[i][1] === "!") {
        emoteUrls.push(lines[i]);
        continue;
    }
    const [emote, url] = lines[i].match(/(?<=;)\w.+?(?=[;\{])/g);
    if (usedEmotes.includes(emote)) {
        lines[i] = "remove";
    } else {
        usedEmotes.push(emote);
        emoteUrls.push(emote.padEnd(34) + url);
    }
}

const newText = lines.filter((line) => line !== "remove").join("\n");

writeFileSync("./Unique Emotes.yna", newText);
writeFileSync("./Unique Emotes.txt", emoteUrls.join("\n"));
writeFileSync("./Emote Names.txt", usedEmotes.join("\n"));
