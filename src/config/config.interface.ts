interface ApiConfigProps {
  httpTimeout: number;
}

interface MongodbConfigProps {
  connectionString: string;
  databaseName: string;
}

export interface ConfigProps {
  port: number;
  api: ApiConfigProps;
  mongodb: {
    database: MongodbConfigProps;
  };
  jwtSecretKey: string;
  jwtKeyDurationInSeconds: number;
}
