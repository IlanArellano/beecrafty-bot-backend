import { CONSOLE_COLORS } from "../../types";

export const getSuccessFulRedisInformation = () => {
  console.log(
    CONSOLE_COLORS.BgGreen,
    CONSOLE_COLORS.FgGreen,
    "El servicio Redis ha inicializado correctamente",
    CONSOLE_COLORS.Reset
  );
};

export const getWarningRedisInformation = (error: any) => {
  console.warn(
    CONSOLE_COLORS.BgYellow,
    CONSOLE_COLORS.FgYellow,
    "El servicio Redis no ha podido inicializar correctamente",
    CONSOLE_COLORS.Reset
  );
  console.error({ error });
};
