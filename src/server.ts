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

const client = new Client();
client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}.`);
});
client.on("message", msg => {
    if (msg.content === ">ping") {
        msg.reply("pong!");
    }
});
client.login(token);
