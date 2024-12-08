import { useReducer } from "react";
import { authenticate, registerUser } from "../../services/userApi";
import { AuthContext } from "./userContext";
import { AuthReducer } from "./userReducer";
import { apiClient } from "../../services/userApi";

export const AuthProvider = ({ children }) => {
  const initialState = {
    user: {
      username: null,
      email: null,
    },
    authStatus: false,
    loading: true,
  };
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const register = async (userData) => {
    try {
      const data = await registerUser(userData);

      dispatch({
        type: "REGISTRO_EXISTOSO",
        payload: data,
      });
    } catch (error) {
      throw new Error(`Error al registrar el usuario: ERROR: ${error}`);
    }
  };

  const login = async (credentials) => {
    try {
      const data = await authenticate(credentials);
      const { token } = data;

      if (token) {
        const user = { email: credentials.email };
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        dispatch({
          type: "LOGIN_EXITOSO",
          payload: { user, token },
        });
      } else {
        throw new Error("Token no recibido");
      }
    } catch (error) {
      throw new Error(`Error al registrar el usuario: ERROR: ${error}`);
    }
  };
  const verifyingToken = async () => {
    const token = localStorage.getItem("token");

    if (token) {
      apiClient.defaults.headers.common["authorization"] = token;
    } else {
      delete apiClient.defaults.headers.common["authorization"];
    }

    try {
      const respuesta = await apiClient.get("/users/verifytoken");

      dispatch({
        type: "OBTENER_USUARIO",
        payload: respuesta.data.usuario,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    dispatch({
      type: "CERRAR_SESION",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        token: state.token,
        authStatus: state.authStatus,
        loading: state.loading,
        register,
        login,
        logout,
        verifyingToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
