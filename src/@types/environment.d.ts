declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    NODE_ENV: 'development' | 'production';
    MONGO_URI: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    ACTIVATION_TOKEN_SECRET: string;
    CLIENT_URL: string;
    OAUTH_PLAYGROUND: string;
    MAILING_SERVICE_CLIENT_ID: string;
    MAILING_SERVICE_CLIENT_SECRET: string;
    MAILING_SERVICE_REFRESH_TOKEN: string;
    EMAIL_ADDRESS: string;
    CLOUD_NAME: string;
    CLOUD_API_KEY: string;
    CLOUD_API_SECRET: string;
  }
}
