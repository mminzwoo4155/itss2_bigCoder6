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

export const updateUserProfile = async (userEmail, profile) => {
    // const querySnapshot = await db.collection("users").where("email", "==", userEmail).get();
    // const profileId = querySnapshot.docs[0]?.id;
    // console.log(profileId, profile)
    await db.collection("users").doc(profile.id).update(profile);
}