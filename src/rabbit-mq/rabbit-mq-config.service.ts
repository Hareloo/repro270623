import type { RabbitMQConfig } from '@golevelup/nestjs-rabbitmq';
import { Inject, Injectable } from '@nestjs/common';
import { WinstonLogger, WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class RabbitMQConfigService {
  constructor(
    // We're injecting WINSTON_MODULE_NEST_PROVIDER which gives an instance of LoggerService rather
    // than the WINSTON_MODULE_PROVIDER which gives an instance of winston.Logger because RabbitMQModule
    // uses methods that only exist (or at least implemented in a special way) in LoggerService
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly loggerService: WinstonLogger,
  ) {}

  async createModuleConfig(): Promise<RabbitMQConfig> {
    const uri = 'amqp://localhost:5672';

    return {
      uri,
      exchanges: [
        {
          name: 'test_exchange',
          type: 'direct',
          createExchangeIfNotExists: true,
          options: {
            durable: true,
          },
        },
      ],
      logger: this.loggerService,
      deserializer: (msg): object | void => {
        const parsedMsg = JSON.parse(msg.toString('utf8'));
        if (typeof parsedMsg === 'object') {
          return parsedMsg;
        } else {
          throw new Error('JSON parsed as an array/string/null');
        }
      },
    };
  }
}
