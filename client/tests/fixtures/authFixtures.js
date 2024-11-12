export const notAuthenticatedState = {
    status: 'not-authenticated',
    token: null,
    user: null,
    errorMessage: null
};

export const authenticatedState = {
    status: 'authenticated',
    token: '4jkjk21k3j21k3j2k13',
    user: {
        id: 6,
        usuario: "dino123",
        correo: "dino_123gmail.com",
        nombre: "Dino",
        apell_paterno: "Pino",
        apell_materno: "Lozano",
        tipo_usuario: "user",
        created_at: "2024-11-12T16:29:58.220Z",
        updated_at: "2024-11-12T16:29:58.220Z"
    },
    errorMessage: null
};

export const initialState = {
    status: 'not-authenticated',
    token: null,
    user: null,
    errorMessage: null
};

export const demoUser = {
    token: '4jkjk21k3j21k3j2k13',
    user: {
        id: 6,
        usuario: "dino123",
        correo: "dino_123gmail.com",
        nombre: "Dino",
        apell_paterno: "Pino",
        apell_materno: "Lozano",
        tipo_usuario: "user",
        created_at: "2024-11-12T16:29:58.220Z",
        updated_at: "2024-11-12T16:29:58.220Z"
    }
};