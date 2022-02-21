
/** Determina si un valor esta vacio */
export const isValueEmpty = (x: any): boolean => x === null || x === undefined || x === "" || x === {} || x === [];

/** Devuelve true si al menos un valor del objecto esta vacio, 
 al menos de que se especifique el numero de valores que se les permita estar vacios */
export const CheckEmptyValue = (obj: object, allow_values?: number): boolean => {
    let isEmpty: boolean = true;

    if(!obj || typeof obj !== "object" || Array.isArray(obj)) return isEmpty;

    
    const valuesEmpty: any[] = Object.values(obj).filter(isValueEmpty);
    if(allow_values && allow_values < valuesEmpty.length)
    return isEmpty;

    return valuesEmpty.length > 0;
}