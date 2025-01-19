import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as fs from 'fs';

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

  const swaggerConfig: any = configService.get<any>('plugin.swagger.config');
  if (swaggerConfig.swaggerUI === true) {
    const swaggerConfigBuilder = new DocumentBuilder()
      .setTitle(swaggerConfig.info.title)
      .setVersion(swaggerConfig.info.version)
      .build();

    const document = SwaggerModule.createDocument(app, swaggerConfigBuilder);
    const swaggerOptions = configService.get<any>('plugin.swagger.options');
    SwaggerModule.setup(swaggerConfig.documentationPath, app, document, {
      swaggerOptions: swaggerOptions,
    });
  }

  await app.listen(port, host);

  console.log(`\n-----------------------------------------------------------`);
  console.log(`APP NAME\t: ${appName}`);
  console.log(`CONFIG ENV\t: ${env}`);
  console.log(`HOST ADDR\t: ${host}`);
  console.log(`HOST PORT\t: ${port}`);
  console.log(`API PREFIX\t: ${apiPrefix}`);
  console.log(`-----------------------------------------------------------\n`);
  
  const appUrl = await app.getUrl();

  let swaggerUrlJson = null;
  if (swaggerConfig.swaggerUI === true) {
    const swaggerUrl = `${appUrl}${swaggerConfig.documentationPath}`;
    swaggerUrlJson = {
      host: appUrl,
      path: `${swaggerConfig.documentationPath}-json`,
      url: `${swaggerUrl}-json`,
    };
    console.log(`SWAGGER DOC IS RUNNING ON\t: ${swaggerUrl}`);
  }
  fs.writeFileSync(
    './swagger-url.json',
    swaggerUrlJson ? JSON.stringify(swaggerUrlJson) : '',
  );

  console.log(`APPLICATION IS RUNNING ON\t: ${appUrl}${apiPrefix}\n`);
}
bootstrap();
