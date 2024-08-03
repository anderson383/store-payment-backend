import { ConfigService } from '@nestjs/config';
import { EnvVariables } from './env/env-variables.enum';
import { AwsConfig } from './aws/aws.config';

interface DBCredentials {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  useSSL: boolean;
}

const awsConfig = new AwsConfig()

export const dataBaseConfigFactory = async (configService: ConfigService) => {
  const dbCredentials = await getDatabaseCredentials(configService);
  console.log(dbCredentials, 'dbCredentials')
  return {
    type: configService.get(EnvVariables.DATABASE_TYPE),
    host: configService.get(EnvVariables.DATABASE_HOST),
    port: configService.get(EnvVariables.DATABASE_PORT),
    username: configService.get(EnvVariables.DATABASE_USER),
    password: configService.get(EnvVariables.DATABASE_PASSWORD),
    database: configService.get(EnvVariables.DATABASE_NAME),

    entities: [configService.get(EnvVariables.TYPEORM_ENTITIES_DIR)],
    synchronize: true,
    logging: true,

    migrationsTableName: configService.get(
      EnvVariables.TYPEORM_MIGRATIONS_TABLENAME,
    ),
    migrations: [configService.get(EnvVariables.TYPEORM_MIGRATIONS_DIR)],
    cli: {migrationsDir: configService.get(EnvVariables.TYPEORMCLI_MIGRATIONS_DIR)},
    ssl: {
      rejectUnauthorized: false
    },
  }
}


const getDatabaseCredentials = async (
  configService: ConfigService,
): Promise<DBCredentials> => {
  if (awsConfig.isRunningOnAWS()) {
    // Only when running on AWS, fetch the RDS credentials from Secrets Manager
    const region = configService.getOrThrow(EnvVariables.AWS_REGION);
    const storeEnv = configService.getOrThrow(EnvVariables.STORE_ENV);
    const rdsCreds = await awsConfig.getRDSCredentials(storeEnv, region);
    console.log('entreee')
    return {
      host: rdsCreds.host,
      port: rdsCreds.port,
      username: rdsCreds.username,
      password: rdsCreds.password,
      database: rdsCreds.dbname,
      useSSL: true,
    };
  } else {
    // if running locally, use the credentials from the .env file or environment variables
    return {
      host: configService.getOrThrow(EnvVariables.DATABASE_HOST),
      port: configService.getOrThrow(EnvVariables.DATABASE_PORT),
      username: configService.getOrThrow(EnvVariables.DATABASE_USER),
      password: configService.getOrThrow(EnvVariables.DATABASE_PASSWORD),
      database: configService.getOrThrow(EnvVariables.DATABASE_NAME),
      useSSL: false,
    };
  }
};
