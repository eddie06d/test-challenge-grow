import { apiUsers } from "../../apis/apiUsers";

export const getUsers = async(page = 1, limit = 10) => {
    const { data } = await apiUsers.get('/', {
        params: { page, limit },
    });

    return data;
};

export const deleteUser = async(id) => {
    await apiUsers.delete(`/${ id }`);
};

export const updateUser = async(id, user) => {
    const { data } = await apiUsers.put(`${ id }`, user);

    return data;
};