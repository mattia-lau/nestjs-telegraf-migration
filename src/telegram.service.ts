import { Injectable, Inject } from "@nestjs/common";
import Telegraf, { ContextMessageUpdate, Middleware, HearsTriggers } from "telegraf";
import { __TELEGRAM_MODULE_SETTINGS__ } from "./constant";
import { TelegramOptions } from "./types";
import { UpdateType } from "telegraf/typings/telegram-types";

@Injectable()
export class TelegramService {
  private bot: Telegraf<ContextMessageUpdate>;

  public constructor(
    @Inject(__TELEGRAM_MODULE_SETTINGS__)
    private options: TelegramOptions,
  ) {
    this.bot = new Telegraf(options.token, options.options);
    this.bot.launch();
  }

  public async sendMessage(message: string, chatId?: string) {
    this.bot.telegram.sendMessage(chatId || this.options.chat_id, message);
  }

  public on(updateTypes: UpdateType, middleware: Middleware<ContextMessageUpdate>) {
    this.bot.on(updateTypes, middleware);
  }

  public hears(triggers: HearsTriggers, middleware: Middleware<ContextMessageUpdate>) {
    this.bot.hears(triggers, middleware);
  }

  public start(middleware: Middleware<ContextMessageUpdate>) {
    this.bot.start(middleware);
  }

  public help(middleware: Middleware<ContextMessageUpdate>) {
    this.bot.help(middleware);
  }

  public command(command: string | string[], middleware: Middleware<ContextMessageUpdate>) {
    this.bot.command(command, middleware);
  }
}
