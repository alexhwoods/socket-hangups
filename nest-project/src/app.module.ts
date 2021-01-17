import { Module, HttpModule } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import * as Agent from 'agentkeepalive';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const agentConfig = {
  maxSockets: 1,
  maxFreeSockets: 1,
};

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
