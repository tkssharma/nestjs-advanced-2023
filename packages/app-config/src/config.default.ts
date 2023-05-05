import { ConfigData } from "./config.interface";

export const DEFAULT_CONFIG: ConfigData = {
  port: Number(process.env.PORT || 3001),
  env: "production",
  db: {
    url: process.env.DATABASE_URL!,
  },
  swagger: {
    username: "",
    password: "",
  },
  logLevel: "",
  email: {
    service_name: "",
    username: "",
    password: "",
  },
  externalApi: {
    apiUrl: "",
    apiKey: "",
  },
};
