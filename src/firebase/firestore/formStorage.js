import firebase from "firebase";
import { db } from "../../firebase";

export const getAllForms = async () => {
  const snapshot = await db.collection("forms").get();
  try {
    let res = [];
    snapshot.docs.forEach((item) => {
      res.push({
        ...item.data(),
        id: item.id,
      });
    });
    return res;
  } catch (e) {
    return [];
  }
};

export const getFormById = async (formId) => {
  const docRef = db.collection("forms").doc(`${formId}`);
  try {
    let data = await docRef.get();
    return { ...data.data(), id: data.id };
  } catch (error) {
    return null;
  }
};

export const getAllSubmittedForm = async () => {
  try {
    const snapshot = await db.collection("submit_form").get();
    return snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    return [];
  }
};

export const getSubmittedFormByEmail = async (email) => {
  try {
    const querySnapshot = await db
      .collection("submit_form")
      .where("student", "==", email)
      .get();
    return querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
  } catch (error) {
    return [];
  }
};

export const submitForm = async (submitEmail, formId, data) => {
  const docData = {
    student: submitEmail,
    form_id: formId,
    answers: data,
    status: 0,
    timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
  };
  await db.collection("submit_form").doc().set(docData);
};

export const approveForm = async (submitFormId) => {
  const update = { status: 1 };
  try {
    await db.collection("submit_form").doc(submitFormId).update(update);
    return "Approved";
  } catch (e) {
    return "Approve error";
  }
};

export const disapproveForm = async (submitFormId) => {
  const update = { status: 2 };
  try {
    await db.collection("submit_form").doc(submitFormId).update(update);
    return "Disapproved";
  } catch (e) {
    return "Disapprove error";
  }
};

export const getSubmittedFormById = async (submitFormId) => {
  // console.log("111", submitFormId);
  // console.log(data);
  try {
    let data = await db.collection("submit_form").doc(submitFormId).get();
    console.log(data.data());
    return { ...data.data() };
  } catch (error) {
    return null;
  }
};
