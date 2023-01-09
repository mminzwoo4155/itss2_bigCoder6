import { db } from "../../firebase";
import { notification } from "antd";

export const getAllContribution = async () => {
  try {
    const snapshot = await db.collection("contribution").get();
    var res = [];
    snapshot.forEach((doc) => {
      res.push({ key: doc.id, ...doc.data() });
    });
    return res;
  } catch (err) {
    console.log("Error retrieving recommendations: ", err.message);
    return [];
  }
};

export const submitContribution = async (submitedEmail, text, upload_file) => {
  try {
    const docData = {
      student: submitedEmail,
      text: text,
      upload_file: upload_file,
    };
    await db.collection("contribution").doc().set(docData);
    notification.success({
        message: "Gửi lời góp ý thành công, cảm ơn !",
      });
  } catch (error) {
    notification.error({
      message: "Xảy ra lỗi rồi, hãy thử lại !",
    });
  }
};
