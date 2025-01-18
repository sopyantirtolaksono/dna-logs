import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    node_env: process.env.NODE_ENV || 'dev',
    host: process.env.HOST || '127.0.0.1',
    port: {
      api: parseInt((process.env.PORT || 3000).toString(), 10),
    },
    projectName: process.env.PROJECT_NAME || 'dna-logs',
    apiPrefix: process.env.API_PREFIX || '/api/v1',
    corsEnabled: process.env.CORS_ENABLED || false,
  }),
);
