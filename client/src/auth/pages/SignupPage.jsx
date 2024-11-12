import { Link } from 'react-router-dom';
import { Input, Checkbox, Button, Alert } from 'antd';
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startLogin } from '../../store/auth/thunks';

const formLogin = {
  correo: '',
  contrasena: ''
};

export const SignupPage = () => {
  const { errorMessage } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { correo, contrasena, onInputChange } = useForm(formLogin);

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(startLogin({ correo, contrasena }));
  };

  return (
    <div className="min-h-screen grid sm:grid-cols-2 grid-cols-1 content-center gap-6">
        <div className="sm:flex sm:flex-col sm:gap-9 sm:items-center hidden">
            <img src="/auth.svg" width={ 300 } alt="img-auth" />
            <Link to="/" className="text-lg underline">
                Create an account
            </Link>
        </div>
        <div className='flex flex-col sm:justify-between sm:gap-0 gap-10 items-center sm:items-start'>
          <div className="flex flex-col gap-8 sm:w-full w-3/4">
            <h1 className="text-4xl font-extrabold">Sign up</h1>
            {
              errorMessage && (
                <Alert 
                  message={ errorMessage } 
                  type="error" 
                  className='sm:w-3/4' 
                  showIcon 
                />
              )
            }
            <form 
              onSubmit={ handleSubmit } 
              className='flex flex-col gap-6 sm:w-3/4'
              aria-label='form'
            >
              <Input
                type='email'
                name='correo'
                aria-label='inputEmail'
                onChange={ onInputChange }
                value={ correo } 
                size="large" 
                placeholder="Your email" 
                prefix={<i className="fa-solid fa-user"></i>}
                required 
              />
              <Input 
                type='password'
                name='contrasena'
                aria-label='inputContrasena'
                onChange={ onInputChange }
                value={ contrasena } 
                size='large'
                placeholder='Your password'
                prefix={ <i className="fa-solid fa-lock"></i> }
                required
              />
              <Checkbox>Remember me</Checkbox>
              <Button 
                type='primary'
                htmlType='submit'
                size='large'
              >
                Login
              </Button>
            </form>
          </div>
          <div className="flex items-center gap-5">
            Or login with
            <div className="flex gap-4">
              <Button
                color='primary' 
                variant='solid'
                icon={ <i className="fa-brands fa-facebook"></i> }
                iconPosition='start' 
                size='large'
              />
              <Button
                color='default'
                variant='solid'
                icon={ <i className="fa-brands fa-twitter"></i> }
                iconPosition='start' 
                size='large'
              />
              <Button
                color='danger'
                variant='solid'
                icon={ <i className="fa-brands fa-google"></i> }
                iconPosition='start' 
                size='large'
              />
            </div>
          </div>
        </div>
    </div>
  )
}
