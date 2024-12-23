# Proyecto_07_E-commerce_FullStack

Este repositorio contiene el frontend del proyecto **E-commerce Fullstack**, una aplicación desarrollada con React y Vite. El frontend está diseñado para conectarse con la API del backend desplegada en [Render](https://proyecto-06-aplicacion-backend-con.onrender.com).

## **Características principales**

- Interfaz moderna y responsive creada con React y Tailwind CSS.
- Conexión con el backend para gestionar usuarios (y su autenticación), productos y compras.
- Implementación de pagos mediante la integración de la API de Mercado Pago.
- Implementación de rutas protegidas.
  -Manejo de estados globales mediante Context API.

## **Tecnologías utilizadas**

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express (ver el [repositorio del backend](https://github.com/MagdalenaLama/Proyecto_06_Aplicacion_Backend))
- **Despliegue:** Netlify (frontend) y Render (backend)

## **Requisitos previos**

1. Node.js v16+ instalado.
2. Clonar este repositorio:

   ```bash
   git clone https://github.com/MagdalenaLama/Proyecto_07_E-commerce_FullStack.git
   ```

3. Entra en la carpeta del proyecto:

```bash
cd client
```

3. Instala las dependencias:

```bash
npm install
```

4. Configura las variables de entorno:
   Crea un archivo `.env` en la raíz del proyecto con los siguientes valores:

```bash
VITE_API_URL="https://proyecto-06-aplicacion-backend-con.onrender.com"
VITE_MERCADOPAGO_PUBLIC_KEY=APP_USR-02ca11dd-0bb4-4668-b160-e5151e0f975d
```

5. Inicia la aplicación con:

```bash
npm run dev
```

6. Para el acceso de rutas protegidas de acceso exclusivo para el rol administrador, utilizar las siguientes credenciales:

   - **Correo:**
     ```
     juanjoherrada@gmail.com
     ```
   - **Contraseña:**
     ```
     password
     ```

7. Para probar el pago con mercado libre ingresar con la siguiente cuenta de prueba:
   - **Usuario:**
     ```
     TESTUSER1922327751
     ```
   - **Contraseña:**
     ```
     UNdZPUXcwg
     ```
