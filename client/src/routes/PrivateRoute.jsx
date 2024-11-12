import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { startLoadUsers } from "../store/users/thunks";

export const PrivateRoute = ({ children }) => {
  const { status, token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if(token) dispatch(startLoadUsers());
  }, []);
  
  return (status === 'authenticated')
  ? children
  : <Navigate to='/auth/signup' />
}
