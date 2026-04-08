


import { useParams, Navigate, Outlet } from "react-router-dom";

export default function AppLayout() {
  const { id } = useParams();
  const storedId = sessionStorage.getItem("id");

  if (!storedId) {
    return <Navigate to="/" replace />;
  }

  // 🚨 Prevent accessing other users
  if (id !== storedId) {
    return <Navigate to={`/profile/${storedId}/home`} replace />;
  }

  return <Outlet />;
}