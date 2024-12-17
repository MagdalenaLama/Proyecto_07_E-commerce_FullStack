import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/User/userContext";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../services/userApi";

export const LoginForm = () => {
  const userCtx = useContext(AuthContext);

  const { login, authStatus, verifyingToken } = userCtx;

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    verifyingToken();

    if (authStatus) {
      console.log(`Token correcto`);
    }
  }, [authStatus]);

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = async (event) => {
    event.preventDefault();
    setError(null); // Reinicia el estado de error

    try {
      // Llama a login y espera el resultado
      await login(data);

      // Obtiene el rol del usuario (puedes ajustar esta lógica si es necesario)
      const role = getUserRole();

      // Navega según el rol del usuario
      if (role === "admin") {
        navigate("/admin");
      } else {
        navigate("/products");
      }
    } catch (err) {
      // Captura errores y los almacena en el estado
      setError("Credenciales inválidas. Por favor, verifica tu información.");
    }
  };

  return (
    <div className="font-sans">
      <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
        <div className="relative sm:max-w-sm w-full">
          <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
            <label className="block mt-3 text-lg text-gray-700 text-center font-semibold">
              Iniciar sesión
            </label>
            <form onSubmit={sendData} className="mt-10">
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  value={data.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  required
                />
              </div>

              <div className="mt-7">
                <input
                  type="password"
                  name="password"
                  placeholder="Contraseña"
                  value={data.password}
                  onChange={handleChange}
                  className="mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0"
                  required
                />
              </div>

              {/* Muestra el error si existe */}
              {error && (
                <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
              )}

              <div className="mt-7">
                <button
                  type="submit"
                  className="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                >
                  Comenzar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
