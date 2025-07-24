import { useAuth0 } from "@auth0/auth0-react";
import { ReactNode, useEffect, useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import { useShallow } from "zustand/shallow";

interface Props {
  children: ReactNode;
  allowedRoles: string[];
}

/* const VITE_AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE; */

// 🧠 Mapeo de nombres de roles de Auth0 a los internos del frontend
const mapRole = (raw: string): string => {
  switch (raw.toLowerCase()) {
    case "administrador": return "admin";
    case "gerente": return "manager";
    case "empleado": return "employee";
    case "repartidor": return "delivery";
    default: return raw.toLowerCase();
  }
};

export const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const {
    isAuthenticated,
    user,
    isLoading,
    getAccessTokenSilently,
  } = useAuth0();

  const { setToken, setRol } = useAuthStore( //rol
    useShallow((state) => ({
      setToken: state.setToken,
      setRol: state.setRol,
      rol: state.rol,
    }))
  );

  // Obtener y mapear el rol del usuario desde el token de Auth0
  const userRole: string | null = useMemo(() => {
    if (!user) return null;

    const key = Object.keys(user).find((k) => k.includes("roles"));
    const raw = key && user[key];
    const role = Array.isArray(raw) ? raw[0] : null;

    return typeof role === "string" ? mapRole(role) : null;
  }, [user]);

  // Sincronizar token y rol con Zustand
  useEffect(() => {
    if (!isAuthenticated || !user || !userRole) return;

    const syncAuthData = async () => {
      try {
        const token = await getAccessTokenSilently();
        setToken(token);
        setRol(userRole);
      } catch (err) {
        console.error("Error al obtener el token:", err);
      }
    };

    syncAuthData();
  }, [isAuthenticated, user, userRole, getAccessTokenSilently, setToken, setRol]);

  // Loading
  if (isLoading) return <p>Cargando...</p>;

  // No autenticado
  if (!isAuthenticated || !user) return <Navigate to="/login" />;

  // Validaciones defensivas
  if (!allowedRoles || !Array.isArray(allowedRoles)) {
    console.warn("allowedRoles no está definido correctamente en ProtectedRoute");
    return <Navigate to="/dashboard" />;
  }

  if (!userRole || !allowedRoles.includes(userRole)) {
    console.warn(`Acceso denegado: el rol '${userRole}' no está permitido para esta ruta`);
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};
