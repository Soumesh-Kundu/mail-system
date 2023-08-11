import * as Realm from 'realm-web'

export function useRealm() {
    const app = new Realm.App({
        id: useRuntimeConfig().appId,
    });
    let mongo = null;
    if (app?.currentUser) {
        mongo = app.currentUser.mongoClient('mongodb-atlas').db(useRuntimeConfig().db).collection(useRuntimeConfig().collection);
    }
    return {
        app,
        Realm,
        mongo,
    };
}
export async function getServerUser() {
    const { app, Realm } = useRealm()
    const credentials = Realm.Credentials.apiKey(useRuntimeConfig().serverApiKey)
    const user = await app.logIn(credentials)
    console.log('from server user')
    return user
}
// getServerUser()