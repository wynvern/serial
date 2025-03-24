import { command as ping } from "./ping";
import { command as cute } from "./cute";
import type { ClientCommand } from "../types";

export const commands: ClientCommand[] = [ping, cute];
