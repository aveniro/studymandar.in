import {createEvent, createStore} from 'effector';

export const userState = createStore(null);

export const userApi = {
    updateUser: createEvent(),
    requestLoginRegister: createEvent(),
    rejectLoginRegister: createEvent()
};

userState.on(userApi.updateUser, (userState, newState) => newState);