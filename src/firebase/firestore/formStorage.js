import { db } from "../../firebase";

export const getAllForms = async () => {
    const snapshot = await db.collection("forms").get();
    try {
        let res = [];
        snapshot.docs.forEach(item => {
            res.push({
                ...item.data(),
                id: item.id
            })
        })
        return res;
    } catch (e) {
        return [];
    }
}

export const getFormById = async (formId) => {
    const docRef = db.collection("forms").doc(`${formId}`);

    docRef.get().then((doc) => {
        return {...doc.data(), id: doc.id};
    }).catch(e => {
        console.log("Error getting document: ", e);
        return null;
    })
}