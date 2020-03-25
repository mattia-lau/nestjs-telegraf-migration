import { Global, Module } from "@nestjs/common";
import { DynamicModule, Provider } from "@nestjs/common/interfaces";
import { __TELEGRAM_MODULE_SETTINGS__ } from "./constant";
import { TelegramService } from "./telegram.service";
import {
  TelegramAsyncOptions,
  TelegramOptions,
  TelegramOptionsFactory
} from "./types";

@Module({
  providers: [TelegramService],
  exports: [TelegramService]
})
@Global()
export class TelegramModule {
  public static forRoot(options: TelegramOptions): DynamicModule {
    return {
      module: TelegramModule,
      providers: [
        {
          provide: __TELEGRAM_MODULE_SETTINGS__,
          useValue: options
        },
        TelegramService
      ],
      exports: [TelegramService]
    };
  }

  public static forRootAsync(options: TelegramAsyncOptions): DynamicModule {
    return {
      module: TelegramModule,
      imports: options.imports || [],
      providers: this.createAsyncProvider(options)
    };
  }

  private static createAsyncProvider(
    options: TelegramAsyncOptions
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass
      }
    ];
  }

  private static createAsyncOptionsProvider(
    options: TelegramAsyncOptions
  ): Provider {
    if (options.useFactory) {
      return {
        provide: __TELEGRAM_MODULE_SETTINGS__,
        useFactory: options.useFactory,
        inject: options.inject || []
      };
    }
    return {
      provide: __TELEGRAM_MODULE_SETTINGS__,
      useFactory: async (optionsFactory: TelegramOptionsFactory) =>
        await optionsFactory.createTelegramOptions(),
      inject: [options.useExisting || options.useClass]
    };
  }
}
