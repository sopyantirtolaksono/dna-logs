import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const configService = app.get(ConfigService);

  const env: string = configService.get<string>('app.node_env');
  const host: string = configService.get<string>('app.host');
  const port: number = configService.get<number>('app.port.api');
  const apiPrefix: string = configService.get<string>('app.apiPrefix');
  const appName: string = configService.get<string>('app.projectName');
  const corsEnabled: boolean = configService.get<boolean>('app.corsEnabled');

  if (corsEnabled) {
    app.enableCors();
  }
  app.setGlobalPrefix(apiPrefix);

  await app.listen(port, host);

  console.log(`\n-----------------------------------------------------------`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`CONFIG ENV\t: ${env}`);
  console.log(`HOST ADDR\t: ${host}`);
  console.log(`HOST PORT\t: ${port}`);
  console.log(`API PREFIX\t: ${apiPrefix}`);
  console.log(`-----------------------------------------------------------\n`);
  
  const appUrl = await app.getUrl();
  console.log(`APPLICATION IS RUNNING ON\t: ${appUrl}${apiPrefix}\n`);
}
bootstrap();
