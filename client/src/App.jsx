import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";
import { AuthProvider } from "./context/User/UserGlobalState";
import { CartProvider } from "./context/Cart/CartGlobalState";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
