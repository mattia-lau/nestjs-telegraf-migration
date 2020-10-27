"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
var common_1 = require("@nestjs/common");
var telegraf_1 = require("telegraf");
var constant_1 = require("./constant");
var TelegramService = /** @class */ (function () {
    function TelegramService(options) {
        this.options = options;
        this._bot = new telegraf_1.default(options.token, options.options);
        this._bot.launch();
    }
    TelegramService.prototype.on = function (updateTypes, middleware) {
        return this._bot.on(updateTypes, middleware);
    };
    TelegramService.prototype.hears = function (triggers, middleware) {
        return this._bot.hears(triggers, middleware);
    };
    TelegramService.prototype.start = function (middleware) {
        return this._bot.start(middleware);
    };
    TelegramService.prototype.help = function (middleware) {
        return this._bot.help(middleware);
    };
    TelegramService.prototype.command = function (command, middleware) {
        return this._bot.command(command, middleware);
    };
    TelegramService.prototype.sendMessage = function (text, extra) {
        var chatId = extra.chatId || this.options.chat_id;
        if (!chatId) {
            throw new common_1.BadRequestException({ message: "Please enter chatId" });
        }
        return this._bot.telegram.sendMessage(chatId, text, extra);
    };
    TelegramService.prototype.sendDocument = function (document, extra) {
        var chatId = extra.chatId || this.options.chat_id;
        return this._bot.telegram.sendDocument(chatId, document, extra);
    };
    Object.defineProperty(TelegramService.prototype, "bot", {
        get: function () {
            return this._bot;
        },
        enumerable: false,
        configurable: true
    });
    TelegramService = __decorate([
        common_1.Injectable(),
        __param(0, common_1.Inject(constant_1.__TELEGRAM_MODULE_SETTINGS__)),
        __metadata("design:paramtypes", [Object])
    ], TelegramService);
    return TelegramService;
}());
exports.TelegramService = TelegramService;
