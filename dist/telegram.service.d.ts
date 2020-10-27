import Telegraf from "telegraf";
import { HearsTriggers, Middleware } from "telegraf/typings/composer";
import { TelegrafContext } from "telegraf/typings/context";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { ExtraDocument, ExtraEditMessage, InputFile, UpdateType } from "telegraf/typings/telegram-types";
import { TelegramOptions } from "./types";
export declare class TelegramService {
    private options;
    private _bot;
    constructor(options: TelegramOptions);
    on(updateTypes: UpdateType, middleware: Middleware<TelegrafContext>): Telegraf<SceneContextMessageUpdate>;
    hears(triggers: HearsTriggers<TelegrafContext>, middleware: Middleware<TelegrafContext>): Telegraf<SceneContextMessageUpdate>;
    start(middleware: Middleware<TelegrafContext>): Telegraf<SceneContextMessageUpdate>;
    help(middleware: Middleware<TelegrafContext>): Telegraf<SceneContextMessageUpdate>;
    command(command: string | string[], middleware: Middleware<TelegrafContext>): Telegraf<SceneContextMessageUpdate>;
    sendMessage(text: string, extra?: ExtraEditMessage & {
        chatId: string | number;
    }): Promise<import("telegram-typings").Message>;
    sendDocument(document: InputFile, extra?: ExtraDocument & {
        chatId: string | number;
    }): Promise<import("telegraf/typings/telegram-types").MessageDocument>;
    get bot(): Telegraf<SceneContextMessageUpdate>;
}
