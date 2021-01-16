import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigurationModule } from './configuration/configuration.module';
import { ConfigurationService } from './configuration/configuration.service';

@Module({
  imports: [ConfigurationModule],
  controllers: [AppController],
  providers: [AppService, ConfigurationService],
})
export class AppModule {}
