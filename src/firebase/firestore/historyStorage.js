import { db } from "../../firebase"


export const getHistory = async (studentId, formId) => {
    try {
        const formData = await db.collection("history").doc(studentId).collection("records").doc(formId).get();
        return {...formData.data()};
    } catch(e){
        console.log(e);
        return {};
    }
}

export const pushHistory = async (studentId, formId, formData) => {
    try {
        const ref = db.collection("history").doc(studentId).collection("records").doc(formId);
        await ref.set(formData);
        return true;
    } catch (e) {
        return false;
    }
}