import { Connection } from 'mysql';

/** Ejecuta un Store Procedure de una base de datos MySQL pasandole el contexto */
export const ExecMySQLSP = (conn: Connection, ...params: any[]) => {
    const paramsJ = params.map(it => {
        if(typeof it === 'string')
        it = `'${it}'`;
        if(typeof it === 'boolean')
        it = it ? 1 : 0;

        return it;
    });
}