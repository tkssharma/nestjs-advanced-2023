import { ConnectionOptions } from "typeorm";

export interface DbConfig {
  entities: ConnectionOptions["entities"];
}
