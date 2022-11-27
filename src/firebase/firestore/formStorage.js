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