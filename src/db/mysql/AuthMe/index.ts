import options from './options';
import { getContext } from '../utils';

/** Obtiene el contexto de la base Authme */
export const getAuthMeContext = () => getContext(options);