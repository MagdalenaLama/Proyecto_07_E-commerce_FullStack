export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_EXITOSO":
      return {
        ...state,
        authStatus: true,
      };
    case "REGISTRO_EXISTOSO":
      return {
        ...state,
        authStatus: true,
      };
    case "CERRAR_SESION":
      localStorage.removeItem("token");
      return {
        state,
        user: null,
        authStatus: null,
        loading: false,
      };
    default:
      return state;
  }
};
