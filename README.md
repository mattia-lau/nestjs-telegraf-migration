# Installation

```
npm install nestjs-telegraf-migration --save
```

or using yarn

```
yarn add nestjs-telegraf-migration
```

# Usage

```typescript
import { Module, Logger } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TelegramService, TelegramModule } from "nestjs-telegraf-migration";
import config from "./config"; // Your config file

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`, // your env file path
      isGlobal: true,
      load: [config]
    }),
    TelegramModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService) {
        return {
          token: configService.get<string>("TELEGRAM_BOT_TOKEN"),
          chat_id: configService.get<string>("TELEGRAM_CHAT_ID") // optional, if you dont need to reply a group or person
        };
      },
      inject: [ConfigService]
    })
    // Or using sync register
    // TelegramModule.forRoot({
    //   token: "<BOT TOKEN>",
    //   chat_id: "<Chat ID>" // optional, if you dont need to reply a group or person
    // })
  ]
})
export class AppModule {
  // You can use DI in any service or module
  // This package support all telegraf methods and events
  constructor(private readonly telegram: TelegramService) {
    this.telegram.on("message", ctx => {
      ctx.reply(
        `Hello ${ctx.update.message.from.username} ${ctx.update.message.text} reply you`
      );
    });

    // Send Message, the options is optional, because your have been settle in TelegramModule
    // parse_mode deafult is HTML
    this.telegram.sendMessage("<message>", {
      chatId: "<chatId>",
      parse_mode: "Markdown" | "MarkdownV2" | "HTML"
    });
  }
}
```
