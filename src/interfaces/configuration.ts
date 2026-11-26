export interface AppConfiguration {
  port: number;
  host: string;
}

export interface DatabaseConfiguration {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
}
