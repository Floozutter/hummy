import {Command} from "commander";
import {Client} from "discord.js";
import {readFileSync} from "fs";

const program = new Command();
program
.requiredOption("--token <string>", "Discord bot token")
.option("--asfile", "interpret token <string> as file", false);
program.parse();
const opts = program.opts();
const token = opts.asfile ? readFileSync(opts.token, "utf8") : opts.token;

const prefix = ">";

const client = new Client();
client.once("ready", () => {
    console.log(`logged in as ${client.user?.tag ?? "???"}.`);
});
client.on("message", message => {
    if (!message.content.startsWith(prefix)) return;
    const [command, ...args] = message.content.slice(prefix.length).trim().split(' ');
    if (command === "ping") {
        message.reply("ping!");
    }
});
client.login(token);
