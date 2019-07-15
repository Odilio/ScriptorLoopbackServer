import { juggler } from '@loopback/repository';
export declare class PostgresDataSource extends juggler.DataSource {
    static dataSourceName: string;
    constructor(dsConfig?: object);
}
