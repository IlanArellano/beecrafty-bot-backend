const MAIN = '/api';
export const ENDPOINT = {
    register: MAIN + '/register',
    status: MAIN + '/status',
    online: MAIN + '/online'
};

const MOJANG_API = process.env.MOJANG_API;

export const PLAYER_API_ENDPOINT = {
    player: MOJANG_API + '/users/profiles/minecraft/'
}
