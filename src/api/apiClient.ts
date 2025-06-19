import axios from "axios";

// Función para obtener el token (la seteás desde AppRoutes o App)
let tokenGetter: (() => Promise<string>) | null = null;

export const setTokenGetter = (getter: () => Promise<string>) => {
  tokenGetter = getter;
};

// Instancia Axios configurada
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_SERVER_URL, 
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token automáticamente
apiClient.interceptors.request.use(
  async (config) => {
    if (tokenGetter) {
      try {
        const token = await tokenGetter();
        console.log("Token obtenido:", token);
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error("Error obteniendo token:", err);
      }
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

// Interceptor de respuesta para manejar errores
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const url = error.config?.url;
      const message = error.message;
      const data = error.response?.data;

      console.warn(`[API ${status}] ${url}`);
      console.error("Error de API:", {
        status,
        url,
        message,
        data,
      });

      // Ejemplo: podrías lanzar un toast o guardar en Zustand un error global
    } else {
      console.error("Error inesperado:", error);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
