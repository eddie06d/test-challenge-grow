import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from 'react-router-dom';
import { authSlice } from "../../../src/store/auth/authSlice";
import { notAuthenticatedState } from "../../fixtures/authFixtures";
import { SignupPage } from '../../../src/auth/pages/SignupPage';

const mockStartLogin = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => ({
    startLogin: ({ correo, contrasena }) => {
        return () => mockStartLogin({ correo, contrasena });
    }
}));

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: () => (fn) => fn()
}));

const store = configureStore({
    reducer: {
        auth: authSlice.reducer
    },
    preloadedState: {
        auth: notAuthenticatedState
    }
});

describe('pruebas en <SignupPage />', () => {
    beforeEach(() => jest.clearAllMocks());

    test('debe mostrar el componente correctamente', () => {
        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <SignupPage />
                </MemoryRouter>
            </Provider>
        );
        
        expect(screen.getByText('Sign up')).toBeTruthy();
    });

    test('evento submit del form debe llamar el startLogin', () => {
        const correo    = 'eddie@google.com';
        const contrasena = '123456';

        render(
            <Provider store={ store }>
                <MemoryRouter>
                    <SignupPage />
                </MemoryRouter>
            </Provider>
        );

        const emailField = screen.getByLabelText('inputEmail');
        fireEvent.change( emailField, { target: { name: 'correo', value: correo } });
        
        const passwordField = screen.getByLabelText('inputContrasena');
        fireEvent.change( passwordField, { target: { name: 'contrasena', value: contrasena } });

        const formTag = screen.getByLabelText('form');
        fireEvent.submit( formTag );

        expect( mockStartLogin ).toHaveBeenCalledWith({
            correo, contrasena
        });
    });
})