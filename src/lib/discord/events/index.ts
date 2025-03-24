import type { ClientEvent } from "../types";

// events
import { event as ready } from "./ready";
import { event as interactionCreate } from "./interactionCreate";

export const events: ClientEvent[] = [ready, interactionCreate];
