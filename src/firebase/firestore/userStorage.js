import { db } from "../../firebase";

export const getUserByEmail = async (userEmail) => {
    const querySnapshot = await db.collection("users").where("email", "==", userEmail).get();
    try {
        // return querySnapshot.docs.map(doc => {return {id: doc.id, ...doc.data()}});
        const userProfileDoc = querySnapshot.docs[0];
        return {id: userProfileDoc.id, ...userProfileDoc.data()};
    } catch (error) {
        console.log("[Error] getUserByEmail: ", error);
        return [];
    }
}

export const registerNewProfile = async (userEmail, role) => {
    const docData = {
        email: userEmail,
        role: role
    };
    await db.collection("users").doc().set(docData);
}