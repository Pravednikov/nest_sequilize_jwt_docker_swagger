import { Module } from '@nestjs/common';

import { FilesController } from './files.controller';
import { FilesService } from './files.service';

@Module({
  imports: [
    // ThrottlerModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => ({
    //     ttl: configService.getOrThrow('UPLOAD_RATE_TTL'),
    //     limit: configService.getOrThrow('UPLOAD_RATE_LIMIT'),
    //   }),
    // }),
  ],
  providers: [
    FilesService,
    // { provide: APP_GUARD, useClass: ThrottlerGuard }
  ],
  exports: [FilesService],
  controllers: [FilesController],
})
export class FilesModule {}
