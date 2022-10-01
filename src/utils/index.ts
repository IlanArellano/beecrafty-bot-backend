/** Determina si un valor esta vacio */
export const isValueEmpty = (x: any): boolean =>
  x === null ||
  x === undefined ||
  x === "" ||
  Object.keys(x || {}).length > 0 ||
  (Array.isArray(x) && x.length === 0);

/** Devuelve true si al menos un valor del objecto esta vacio, 
 al menos de que se especifique el numero de valores que se les permita estar vacios */
export const CheckEmptyValue = (
  obj: object,
  allow_values?: number
): boolean => {
  let isEmpty: boolean = true;

  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return isEmpty;

  const valuesEmpty: any[] = Object.values(obj).filter(isValueEmpty);
  if (allow_values && allow_values < valuesEmpty.length) return isEmpty;

  return valuesEmpty.length > 0;
};

/**Transforma una funcion sincrona en Promesa */
export const toPromise = <T>(fn: Function, ...args: any[]): Promise<T> => {
  return new Promise((resolve, reject) => {
    try {
      const res = fn(...args) as T;
      resolve(res);
    } catch (error) {
      reject(error);
    }
  });
};
