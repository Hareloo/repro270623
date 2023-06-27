import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitMQConfiguredModule } from './rabbit-mq/rabbit-mq-configured.module';
import { WinstonModule } from 'nest-winston';
import { LoggerOptionsFactoryService } from './logger/logger-options-factory.service';

@Module({
  imports: [
    // Load winston logger
    WinstonModule.forRootAsync({
      useClass: LoggerOptionsFactoryService,
    }),
    RabbitMQConfiguredModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
