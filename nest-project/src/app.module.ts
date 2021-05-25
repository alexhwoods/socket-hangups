import { Module, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import * as Agent from 'agentkeepalive';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const agentConfig = {
  maxSockets: 3,
  maxFreeSockets: 3,
  timeout: 55000,
  freeSocketTimeout: 27500,
}

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        httpAgent: new Agent(agentConfig),
        httpsAgent: new Agent.HttpsAgent(agentConfig),
      }),
    }),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
