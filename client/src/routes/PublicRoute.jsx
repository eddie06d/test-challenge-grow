import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PublicRoute = ({ children }) => {
  const { status } = useSelector(state => state.auth);
  
  return (status === 'not-authenticated')
  ? children
  : <Navigate to='/' />
}