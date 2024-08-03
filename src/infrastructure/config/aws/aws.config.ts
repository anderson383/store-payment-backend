import {
  SecretsManagerClient,
  GetSecretValueCommand,
  ListSecretsCommand,
} from '@aws-sdk/client-secrets-manager';
import { Logger } from '@nestjs/common';

export interface RDSCredentials {
  password: string;
  dbname: string;
  engine: string;
  port: number;
  dbInstanceIdentifier: string;
  host: string;
  username: string;
}

const logger = new Logger('AWSConfigService');

export class AwsConfig {

  public isRunningOnAWS(): boolean {
    const executionEnv = process.env.AWS_EXECUTION_ENV;
    const ecsMetadataUri = process.env.ECS_CONTAINER_METADATA_URI;
    return executionEnv === 'AWS_ECS_FARGATE' || !!ecsMetadataUri;
  }
  
  public async getRDSCredentials (
    envName: string,
    region: string,
  ): Promise<RDSCredentials> {
    const client = new SecretsManagerClient({ region });
    const secretName = `${envName}/store-payment`;
  
    logger.log(`Fetching RDS creds from SecretsManager ${secretName}`);
    const secrets = await client.send(new ListSecretsCommand({
      Filters: [{
        Key: 'name',
        Values: [secretName]
      }]
    }));
  
    if (!secrets.SecretList || secrets.SecretList.length === 0) {
      throw new Error(`${secretName} not found on AWS Secrets Manager`);
    }
  
    if (secrets.SecretList.length > 1) {
      throw new Error(`Multiple secrets found with name ${secretName}`);
    }
  
    const secretId = secrets.SecretList[0].ARN;
    const data = await client.send(new GetSecretValueCommand({
      SecretId: secretId
    }));
  
    const secret: RDSCredentials = JSON.parse(data.SecretString);
  
    logger.log(`Secret fetched successfully ${secretId}`);
    return secret;
  }
}
