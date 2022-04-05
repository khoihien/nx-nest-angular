import { Module } from '@nestjs/common';
import {ApiServerFeatureConfigModule} from "@nx-nest-angular/api-server/feature-config";



@Module({
  imports: [ApiServerFeatureConfigModule],

})
export class AppModule {}
