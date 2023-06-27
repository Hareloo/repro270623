import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Global, Module } from '@nestjs/common';
import { RabbitMQConfigService } from './rabbit-mq-config.service.js';

@Global()
@Module({
  imports: [
    // Connect to RabbitMQ and assert exchanges and queues
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useClass: RabbitMQConfigService,
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitMQConfiguredModule {}
