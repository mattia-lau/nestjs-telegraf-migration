import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import Telegraf from "telegraf";
import { HearsTriggers, Middleware } from "telegraf/typings/composer";
import { TelegrafContext } from "telegraf/typings/context";
import { SceneContextMessageUpdate } from "telegraf/typings/stage";
import { ExtraEditMessage, UpdateType } from "telegraf/typings/telegram-types";
import { __TELEGRAM_MODULE_SETTINGS__ } from "./constant";
import { TelegramOptions } from "./types";

@Injectable()
export class TelegramService {
  private bot: Telegraf<SceneContextMessageUpdate>;

  public constructor(
    @Inject(__TELEGRAM_MODULE_SETTINGS__)
    private options: TelegramOptions
  ) {
    this.bot = new Telegraf(options.token, options.options);
    this.bot.launch();
  }

  public on(updateTypes: UpdateType, middleware: Middleware<TelegrafContext>) {
    return this.bot.on(updateTypes, middleware);
  }

  public hears(
    triggers: HearsTriggers<TelegrafContext>,
    middleware: Middleware<TelegrafContext>
  ) {
    return this.bot.hears(triggers, middleware);
  }

  public start(middleware: Middleware<TelegrafContext>) {
    return this.bot.start(middleware);
  }

  public help(middleware: Middleware<TelegrafContext>) {
    return this.bot.help(middleware);
  }

  public command(
    command: string | string[],
    middleware: Middleware<TelegrafContext>
  ) {
    return this.bot.command(command, middleware);
  }

  public sendMessage(
    text: string,
    extra?: ExtraEditMessage & { chatId: string | number }
  ) {
    let chatId = extra.chatId || this.options.chat_id;
    if (!chatId) {
      throw new BadRequestException({ message: "Please enter chatId" });
    }
    return this.bot.telegram.sendMessage(chatId, text, extra);
  }
}