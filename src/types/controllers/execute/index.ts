import type { Mode } from "../general";

export interface ExecuteBody {
  /**Indica si el usuario tiene el rol de admin en discord */
  is_admin: boolean;
  /**El comando que se desea ejecutar en consola */
  command: string;
  /**Si @see ExecuteBody.console esta deshabilitado indicar a que usuario se le ejecutaria el comando,
   * si el usuario escribe directamente el comando /execute este parametro no es necesario */
  minecraft_user_name: string | null;
  /**Indica si el usuario es de Minecraft Java o Bedrock, si no lo declara el usuario por defecto es Java */
  type: Mode | null;
  /** Indica si el comando será ejecutado en consola o por un usuario,
   * si la propiedad esta habilitada pero el usuario no declaró ningun usuario entonces por defecto se ejecutará desde consola */
  is_console: boolean;
}
