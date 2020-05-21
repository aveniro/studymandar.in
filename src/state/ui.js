import {createApi, createStore} from 'effector';

export const menuStore = createStore('closed');

export const menuApi = createApi(menuStore, {
    toggle: (menuStore) => menuStore === 'open' ? 'closed' : 'open',
    close: () => 'closed'
});

export const loadStore = createStore('inactive');

export const loadApi = createApi(loadStore, {
    start: () => 'active',
    stop: () => 'inactive'
});