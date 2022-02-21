const MAIN = `/api/${process.env.API_VERSION}`;
export const ENDPOINT = {
    link: MAIN + '/link',
    status: MAIN + '/status',
    online: MAIN + '/online',
    test: MAIN + '/test'
};

const MOJANG_API = process.env.MOJANG_API;

export const PLAYER_API_ENDPOINT = {
    player: MOJANG_API + '/users/profiles/minecraft/'
}
