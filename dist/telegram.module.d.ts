import { DynamicModule } from "@nestjs/common/interfaces";
import { TelegramAsyncOptions, TelegramOptions } from "./types";
export declare class TelegramModule {
    static forRoot(options: TelegramOptions): DynamicModule;
    static forRootAsync(options: TelegramAsyncOptions): DynamicModule;
    private static createAsyncProvider;
    private static createAsyncOptionsProvider;
}
