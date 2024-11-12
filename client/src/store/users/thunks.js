import { getUsers, deleteUser, updateUser } from "../../home/helpers/crudUsers";
import { deleteUserAction, setUsers, updateUserAction } from "./usersSlice";

export const startLoadUsers = (page = 1, limit = 10) => {
    return async (dispatch) => {
        const resp = await getUsers(page, limit);
        
        dispatch(setUsers({
            users: resp.data,
            pagination: resp.pagination
        }));
    };
};

export const startDeleteUser = (id) => {
    return async (dispatch) => {
        if(!id) throw new Error('ID was not provided');

        await deleteUser(id);

        dispatch(deleteUserAction(id));
    };
};

export const startUpdateUser = (id, user) => {
    return async (dispatch) => {
        if(!id) throw new Error('ID was not provided');

        const resp = await updateUser(id, user);

        dispatch(updateUserAction(resp.data));
    };
};