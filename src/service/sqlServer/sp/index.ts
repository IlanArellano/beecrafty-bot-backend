import { output, ERROR_PARAMS, ERROR_RESPONSE } from '../../../types';
import { getContext } from '../../../db';

export const execSP = async (name: string, params: any[]): Promise<output> => {
  const pool = await getContext();
    try {
        if (!Array.isArray(params)) return {
            estatus: false,
            output: ERROR_PARAMS
        };

        params = params.map((el) => {
          if (typeof el === "string") el = `'${el}'`;
          return el;
        });
        
        let setParams: string = params.join(",");
        setParams = setParams.slice(0, setParams.length);
    
        
        const res = await pool.query(`EXEC [dbo].[${name}] ${setParams}`);
        const response = res.recordset[0];
        if (
          !response ||
          (response.estatus === undefined && response.output === undefined)
        )
           return {
            estatus: false,
            output: ERROR_RESPONSE
        };;
    
        return {
          estatus: response.estatus,
          output: response.output,
        };
      } catch (error) {
        return {
            estatus: false,
            output: error
        };;
      }
      finally {
       if(pool.connected) pool.close();
      }
}