import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/auth/authSlice';
import { clearUsersLogout } from '../../store/users/usersSlice';

export const HomeLayout = ({ children }) => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUsersLogout());
  };

  return (
    <>
        <div className="bg-blue-400 py-4 px-5 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-4">
                <i className="fa-solid fa-house"></i>
                <p className="text-xl font-bold">Home</p>
            </Link>
            <div className="flex items-center gap-4">
                <span className='text-lg font-semibold'>
                    { user?.nombre } { user?.apell_paterno } { user?.apell_materno }
                </span>
                <Button onClick={ handleLogout }>
                    <i className="fa-solid fa-right-from-bracket"></i>
                    Logout
                </Button>
            </div>
        </div>
        <div className="p-4">
            { children }
        </div>
    </>
  )
}
