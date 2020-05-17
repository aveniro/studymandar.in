import {createStore, createApi} from 'effector';

export const userState = createStore(null);

export const userApi = createApi(userState, {
    updateUser: (userState, newState) => {
        return newState;
    }
});