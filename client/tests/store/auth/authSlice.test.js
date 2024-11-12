import { authSlice, login, logout } from "../../../src/store/auth/authSlice";
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures";

describe('pruebas en authSlice', () => {
    test('debe regresar el estado inicial y llamarse "auth"', () => {
        const state = authSlice.reducer(initialState, {});

        expect(state).toEqual(initialState);
        expect(authSlice.name).toBe("auth");
    });

    test('debe realizar el login', () => {
        const state = authSlice.reducer(initialState, login(demoUser));

        expect(state).toEqual({
            status: 'authenticated',
            token: demoUser.token,
            user: demoUser.user,
            errorMessage: null
        });
    });

    test('debe realizar el logout sin argumentos', () => {
        const state = authSlice.reducer( authenticatedState, logout() );

        expect(state).toEqual({
            status: 'not-authenticated',
            token: null,
            user: null,
            errorMessage: undefined
        })
    });

    test('debe realizar el logout y mostrar un mensaje de error', () => {
        const errorMessage = 'Credenciales no son correctas';

        const state = authSlice.reducer( authenticatedState, logout({ errorMessage }) );

        expect(state).toEqual({
            status: 'not-authenticated',
            token: null,
            user: null,
            errorMessage
        });
        
    });
})