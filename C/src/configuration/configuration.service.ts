import { Injectable, Scope } from '@nestjs/common';
import * as Agent from 'agentkeepalive';

const agentConfig = {
  maxSockets: 1,
  maxFreeSockets: 1,
};

@Injectable({ scope: Scope.DEFAULT })
export class ConfigurationService {
  httpAgent: Agent;
  httpsAgent: Agent.HttpsAgent;

  constructor() {
    this.httpAgent = new Agent(agentConfig);
    this.httpsAgent = new Agent.HttpsAgent(agentConfig);
  }
}
