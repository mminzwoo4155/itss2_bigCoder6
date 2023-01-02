import { db } from "../../firebase";


export const getAllRecommend = async () => {
    try {
        const snapshot = await db.collection("recommendations").get();
        var res = [];
        snapshot.forEach((doc) => {
            res.push({key: doc.id, ...doc.data()})
        });
        return res;
    } catch(err) {
        console.log("Error retrieving recommendations: ", err.message);
        return [];
    }
}