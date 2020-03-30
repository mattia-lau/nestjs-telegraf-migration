import { ContextMessageUpdate, Middleware, HearsTriggers } from "telegraf";
import { TelegramOptions, SendMessageOptions } from "./types";
import { UpdateType } from "telegraf/typings/telegram-types";
export declare class TelegramService {
    private options;
    private bot;
    constructor(options: TelegramOptions);
    sendMessage(message: string, options?: SendMessageOptions): Promise<void>;
    on(updateTypes: UpdateType, middleware: Middleware<ContextMessageUpdate>): void;
    hears(triggers: HearsTriggers, middleware: Middleware<ContextMessageUpdate>): void;
    start(middleware: Middleware<ContextMessageUpdate>): void;
    help(middleware: Middleware<ContextMessageUpdate>): void;
    command(command: string | string[], middleware: Middleware<ContextMessageUpdate>): void;
}
