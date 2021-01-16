import { Injectable } from '@nestjs/common';
import * as Agent from 'agentkeepalive';

const agentConfig = {
  maxSockets: 1, // we're trying to produce socket hangups. So this is a parameter we're gonna mess with
  maxFreeSockets: 1,
  timeout: 60,
  freeSocketTimeout: 30,
};

@Injectable()
export class ConfigurationService {
  httpAgent: Agent;
  httpsAgent: Agent.HttpsAgent;

  constructor() {
    this.httpAgent = new Agent(agentConfig);
    this.httpsAgent = new Agent.HttpsAgent(agentConfig);
  }
}
