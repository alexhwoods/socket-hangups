import { Injectable } from '@nestjs/common';
import * as Agent from 'agentkeepalive';

const agentConfig = {
  maxSockets: 50,
  maxFreeSockets: 50,
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
