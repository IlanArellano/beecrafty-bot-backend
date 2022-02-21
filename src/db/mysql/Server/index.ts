import options from './options';
import { getContext } from '../utils';


/** Obtiene el contexto de la base Servidor */
export const getServerContext = () => getContext(options);