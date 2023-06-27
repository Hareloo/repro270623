import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @RabbitSubscribe({
    queue: 'test_queue',
    routingKey: 'test',
    exchange: 'test_exchange',
    createQueueIfNotExists: true,
  })
  test(msg: object) {
    console.log(msg);
  }
}
