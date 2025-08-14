import { command as ping } from "./ping";
import { command as cute } from "./cute";
import { command as about } from "./about";
import { command as meow } from "./meow";
import { command as purr } from "./purr";
import { command as hug } from "./hug";
import { command as boop } from "./boop";
import { command as pat } from "./pat";
import { command as nap } from "./nap";
import { command as uwu } from "./uwu";
import { command as status } from "./status";
import { command as uptime } from "./uptime";
import { command as uwufy } from "./uwufy";
import { command as ship } from "./ship";
import { command as morse } from "./morse";
import { command as pick } from "./pick";
import { command as eightball } from "./8ball";
import { command as reverse } from "./reverse";
import { command as dice } from "./dice";
import type { ClientCommand } from "../types";

export const commands: ClientCommand[] = [
	// System commands
	ping, status, uptime,
	// Interaction commands
	cute, about, meow, purr, hug, boop, pat, nap, uwu,
	// Fun commands
	uwufy, ship, morse, pick, eightball, reverse, dice
];
