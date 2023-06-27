import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerOptionsFactoryService } from './logger/logger-options-factory.service';
import { WinstonModule } from 'nest-winston';

async function bootstrap() {
  // Create nest application instances based on our AppModule and make it use the winston logger for logs
  const loggerOptionsFactoryService = new LoggerOptionsFactoryService();
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(
      loggerOptionsFactoryService.createWinstonModuleOptions(),
    ),
  });
  await app.listen(3000);
}
bootstrap();
