import { Databases, Query, Storage } from "appwrite";
import { Account, Avatars, Client, ID } from "react-native-appwrite";
export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "665a9f4e00327dbc0373",
  databaseId: "665aa40b00231ea723fc",
  userCollectionId: "665aa45800116b003ea7",
  videoCollectionId: "665aa519000ce1fb60c7",
  storageId: "665ab1b0003770129742",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

const client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    if (!newAccount) throw error;
    const avatarUrl = avatar.getInitials(username);
    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export async function signIn(email, password) {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );
    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId
    );
    return posts.documents;
  } catch (error) {
        throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.orderDesc('$createdAt', Query.limit(7))]
    );
    return posts.documents;
  } catch (error) {
        throw new Error(error);
  }
};

export const searchPosts = async (query) => {
  try {
    const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.search('title', query)]
    );
    return posts.documents;
  } catch (error) {
        throw new Error(error);
  }
};

export const getUserPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
        databaseId,
        videoCollectionId,
        [Query.equal('creator', userId)]
    );
    return posts.documents;
  } catch (error) {
        throw new Error(error);
  }
};

export const signOut = async()=> {
  try {
    const session = await account.deleteSession('current');
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async(fileId, type)=> {
  let fileUrl;
  try {
    if(type === 'video'){
      fileUrl = storage.getFileView(storageId, fileId);
    } else if (type === 'image'){
      fileUrl = storage.getFilePreview(storageId, fileId, 200, 200, "top", 100);
    }else {
      throw new Error("Invalid file type");
    }
    if(!fileUrl){
      throw Error;
    }
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export async function uploadFile(file, type) {
  if (!file) return;

  const asset = { 
    type: file.mimeType,
    name: file.fileName,
    size: file.fileSize,
    uri: file.uri,
  };
  try {
    const uploadedFile = await storage.createFile(
      storageId,
      ID.unique(),
      asset
    );
     console.log("uploadedFile",uploadedFile); 
    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const createVideo = async(form)=> {
  try {
    const [ videoUrl, thumbnailUrl ] = await Promise.all([
      uploadFile(form.thumbnail, 'image'),
      uploadFile(form.video, 'video')
    ])

    const newPost = await databases.createDocument(
      databaseId, videoCollectionId, ID.unique(), {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId

      }
    )
    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}