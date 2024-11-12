import axios from "axios";
import { startLogin } from "../../../src/store/auth/thunks";
import { demoUser } from "../../fixtures/authFixtures";
import { login } from "../../../src/store/auth/authSlice";

jest.mock('axios');

describe('pruebas en AuthThunks', () => {
    const dispatch = jest.fn();

    beforeEach(() => jest.clearAllMocks());

    test('startLogin debe devolver la respuesta de un login exitoso', async() => {
        const credentials = {
            correo: 'test@gmail.com',
            contrasena: '123456'
        };

        const mockResponse = {
            data: {
              success: true,
              ...demoUser
            }
        };
      
        axios.post.mockResolvedValue(mockResponse);

        await startLogin(credentials)(dispatch);

        expect(dispatch).toHaveBeenCalledWith(login({
            token: mockResponse.data.token,
            user: mockResponse.data.user
        }));
    });
})