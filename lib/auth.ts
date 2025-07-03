import { account } from "./appwrite";

export const createUser = async (
    email: string,
    password: string,
    name: string
) => {
    try{
        const user = await account.create('unique()', email, password, name);

        await account.createEmailPasswordSession(email, password)
        console.log(user)
        return user;
    } catch (error) {
        console.error("Failed to create user", error)
    }
}

export const signIn = async (
    email: string,
    password: string
) => {
    try{ 
       const session = await account.createEmailPasswordSession(email, password)
       console.log(session)
        return session;
    } catch(error) {
        console.error("Failed to login in", error)
    }
}

export const getCurrentUser = async () => {
    try{
        const user = await account.get();
        return user;
    } catch (error) {
        console.error("Failed to get current user",error)
        return null
    }
}