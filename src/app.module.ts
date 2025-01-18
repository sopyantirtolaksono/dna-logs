import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configs from './configs';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { LogCountModule } from './log-count/log-count.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      ignoreEnvFile: false,
      isGlobal: true,
      cache: true,
      envFilePath: '.env',
    }),
    LogCountModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // Terapkan middleware untuk semua rute
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
