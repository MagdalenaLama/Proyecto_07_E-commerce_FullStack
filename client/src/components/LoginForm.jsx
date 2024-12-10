// import { useState, useContext, useEffect } from "react";
// import { AuthContext } from "../context/User/userContext";
// import { useNavigate } from "react-router-dom";

// export const LoginForm = () => {
//   const userCtx = useContext(AuthContext);
//   const navigate = useNavigate();

//   const { login, authStatus, verifyingToken } = userCtx;

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//   });

//   useEffect(() => {
//     verifyingToken();

//     if (authStatus) {
//       console.log(`Token correcto`);
//       navigate("/productos");
//     }
//   }, [authStatus]);

//   if (authStatus)
//     return (
//       <>
//         <button>Cerrar Sesion</button>
//       </>
//     );

//   const handleChange = (event) => {
//     setData({
//       ...data,
//       [event.target.name]: event.target.value,
//     });
//   };

//   const sendData = (event) => {
//     event.preventDefault();
//     login(data);
//   };

//   return (
//     <>
//       <div>
//         <div>
//           <div>
//             <h2>Iniciar sesión</h2>
//           </div>
//           <form
//             onSubmit={(e) => {
//               sendData(e);
//             }}
//           >
//             <input type="hidden" name="remember" value="true" />
//             <div>
//               <div>
//                 <label htmlFor="email-address">Tu correo</label>
//                 <input
//                   id="email-address"
//                   onChange={(e) => {
//                     handleChange(e);
//                   }}
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   placeholder="Tu correo"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="password">Password</label>

//                 <input
//                   id="password"
//                   name="password"
//                   onChange={(e) => {
//                     handleChange(e);
//                   }}
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   placeholder="Password"
//                 />
//               </div>
//             </div>

//             <div>
//               <button type="submit">Comenzar</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/User/userContext";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const userCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const { login, authStatus, verifyingToken } = userCtx;

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    verifyingToken();

    if (authStatus) {
      console.log(`Token correcto`);
      navigate("/products");
    }
  }, [authStatus]);

  if (authStatus)
    return (
      <div className="font-sans">
        <div className="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100">
          <div className="relative sm:max-w-sm w-full">
            <div className="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md">
              <label className="block mt-3 text-lg text-gray-700 text-center font-semibold">
                Estás autenticado
              </label>
              <button
                onClick={() => {
                  // Aquí podrías agregar una función de cierre de sesión si es necesaria
                  console.log("Cerrar Sesión");
                }}
                className="mt-7 bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    );

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const sendData = (event) => {
    event.preventDefault();
    login(data);
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
