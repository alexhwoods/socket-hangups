import { Module, HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';

@Module({
  imports: [
    ConfigurationModule,
    HttpModule.registerAsync({
      imports: [ConfigurationModule],
      inject: [ConfigurationService],
      useFactory: (configurationService: ConfigurationService) => ({
        httpAgent: configurationService.httpAgent,
        httpsAgent: configurationService.httpsAgent,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule {}
