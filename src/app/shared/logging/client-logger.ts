import { Injectable } from '@angular/core';

export abstract class ClientLogger {
  abstract debug(message: string, data?: unknown): void;
  abstract info(message: string, data?: unknown): void;
  abstract warn(message: string, data?: unknown): void;
  abstract error(message: string, data?: unknown): void;
}

@Injectable()
export class ConsoleClientLogger extends ClientLogger {
  debug(message: string, data?: unknown): void {
    console.debug(message, data ?? '');
  }

  info(message: string, data?: unknown): void {
    console.info(message, data ?? '');
  }

  warn(message: string, data?: unknown): void {
    console.warn(message, data ?? '');
  }

  error(message: string, data?: unknown): void {
    console.error(message, data ?? '');
  }
}

@Injectable()
export class SilentClientLogger extends ClientLogger {
  debug(_message: string, _data?: unknown): void {}
  info(_message: string, _data?: unknown): void {}
  warn(_message: string, _data?: unknown): void {}
  error(_message: string, _data?: unknown): void {}
}