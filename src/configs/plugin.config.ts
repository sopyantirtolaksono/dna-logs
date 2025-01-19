import { registerAs } from '@nestjs/config';

export default registerAs(
  'plugin',
  (): Record<string, any> => ({
    swagger: {
      config: {
        info: {
          title: 'dna-logs',
        },
        swaggerUI: Boolean(process.env.SWAGGER_ENABLED) || false,
        documentationPath: '/swagger/log_count',
      },
      options: {
        apisSorter: 'alpha',
        tagsSorter: 'alpha',
        operationsSorter: 'alpha',
      },
    },
  }),
);
