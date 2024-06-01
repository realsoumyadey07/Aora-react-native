import { Account, Avatars, Client, ID } from "react-native-appwrite"
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: 'com.jsm.aora',
    projectId: '665a9f4e00327dbc0373',
    databaseId: '665aa40b00231ea723fc',
    userCollection: '665aa45800116b003ea7',
    videoCollectionId: '665aa519000ce1fb60c7',
    storageId: '665ab1b0003770129742'
}

const client = new Client();
client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)

const account = new Account(client);
const avatar = new Avatars(client);

export const createUser = async(email, password, username)=> {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );
        if (!newAccount) throw error;
        const avatarUrl = avatar.getInitials(username);
        await signIn();
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export async function signIn(email, password){
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}