/* eslint-disable camelcase */

import MigrationBuilderImpl from "node-pg-migrate/dist/migration-builder";
import tableNames from "../tableNames.json"
import {Action} from "node-pg-migrate/dist/operations/tablesTypes";

export const shorthands = undefined;

const CURRENT_TIMESTAMP = (pgm: MigrationBuilderImpl) => ({
    type: 'timestamp',
    notNull: true,
    default: pgm.func('current_timestamp'),
});
const UUID = (pgm: MigrationBuilderImpl) => ({
    type: 'uuid',
    notNull: true,
    primaryKey: true,
    default: pgm.func('uuid_generate_v4()'),
});
const REF = (pgm: MigrationBuilderImpl, tableRef: string) => ({
    type: 'uuid',
    notNull: true,
    references: '\"' + tableRef + '\"',
    onDelete: 'RESTRICT' as Action,
});
const VARCHAR_NOT_NULL = {type: 'varchar(1000)', notNull: true}

export const up = (pgm: MigrationBuilderImpl) => {
    pgm.createExtension("uuid-ossp", {
        ifNotExists: true
    });
    pgm.createTable(tableNames.AKTOR, {
        id: UUID(pgm),
        navn: VARCHAR_NOT_NULL,
        ident: VARCHAR_NOT_NULL,
        opprettet: CURRENT_TIMESTAMP(pgm),
        oppdatert: CURRENT_TIMESTAMP(pgm),
    })

    pgm.createTable(tableNames.BESTILLING, {
        id: UUID(pgm),
        navn: VARCHAR_NOT_NULL,
        type: VARCHAR_NOT_NULL,
        bestiller: REF(pgm, tableNames.AKTOR),
        behandler: REF(pgm, tableNames.AKTOR),
        bruker: REF(pgm, tableNames.AKTOR),
        spesifikasjon: VARCHAR_NOT_NULL,
        status: VARCHAR_NOT_NULL,
        opprettet: CURRENT_TIMESTAMP(pgm),
        oppdatert: CURRENT_TIMESTAMP(pgm),
    })
    pgm.createTable(tableNames.HELSEOPPLYSNINGSTYPE, {
        id: UUID(pgm),
        navn: VARCHAR_NOT_NULL,
        opprettet: CURRENT_TIMESTAMP(pgm),
        oppdatert: CURRENT_TIMESTAMP(pgm),
    })
    pgm.createTable(tableNames.HELSEOPPLYSNING, {
        id: UUID(pgm),
        bestilling: REF(pgm, tableNames.BESTILLING),
        helseopplysningstype: REF(pgm, tableNames.HELSEOPPLYSNINGSTYPE),
        navn: VARCHAR_NOT_NULL,
        opplysning: VARCHAR_NOT_NULL,
        status: VARCHAR_NOT_NULL,
        tekst_til_behandler: VARCHAR_NOT_NULL,
        opprettet: CURRENT_TIMESTAMP(pgm),
        oppdatert: CURRENT_TIMESTAMP(pgm),
    })


};

export const down = (pgm: MigrationBuilderImpl) => {
    Object.values(tableNames).forEach(name => {
        pgm.dropTable(name, {
            ifExists:true,
            cascade:true,
        });
    })
};
