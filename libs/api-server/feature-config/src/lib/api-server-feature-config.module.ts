import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {appConfig, authConfig, dbConfig} from "@nx-nest-angular/api-server/utils-config";

@Module({
  imports:[ConfigModule.forRoot({
    isGlobal:true,
    load:[appConfig,dbConfig,authConfig]
  })]
})
export class ApiServerFeatureConfigModule {}

