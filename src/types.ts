import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { TelegrafOptions, ParseMode } from ".";

export interface TelegramOptions {
  token: string;
  chat_id?: string;
  options?: TelegrafOptions;
}

export interface SendMessageOptions {
  chatId?: string;
  parse_mode?: ParseMode;
}

export interface TelegramOptionsFactory {
  createTelegramOptions(): Promise<TelegramOptions> | TelegramOptions;
}

export interface TelegramAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  useFactory: (...args: any[]) => Promise<TelegramOptions> | TelegramOptions;
  inject?: any[];
  useExisting?: Type<TelegramOptionsFactory>;
  useClass?: Type<TelegramOptionsFactory>;
}
