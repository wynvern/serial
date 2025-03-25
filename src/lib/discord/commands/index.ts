import { command as ping } from "./ping";
import { command as cute } from "./cute";
import { command as about } from "./about";
import type { ClientCommand } from "../types";

export const commands: ClientCommand[] = [ping, cute, about];
