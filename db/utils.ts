import MigrationBuilderImpl from "node-pg-migrate/dist/migration-builder";
import {Action} from "node-pg-migrate/dist/operations/tablesTypes";

export const CURRENT_TIMESTAMP = (pgm: MigrationBuilderImpl) => ({
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp'),
});
export const UUID = (pgm: MigrationBuilderImpl) => ({
    type: 'uuid',
    notNull: true,
    primaryKey: true,
    default: pgm.func('uuid_generate_v4()'),
});
export const REF = (pgm: MigrationBuilderImpl, tableRef: string) => ({
    type: 'uuid',
    notNull: true,
    references: '\"' + tableRef + '\"',
    onDelete: 'RESTRICT' as Action,
});
export const VARCHAR_NOT_NULL = {type: 'varchar(1000)', notNull: true}
