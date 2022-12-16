import { useEffect, useState } from "react"
import { db } from "../firebase";

const useSubmitForm = () => {
    const [submitForms, setSubmitForms] = useState([]);

    useEffect(() => {
        const unsubcribe = db.collection("submit_form").onSnapshot((snapshot) => {
            var forms = [];
            snapshot.forEach((doc) => {
                forms.push({id: doc.id, ...doc.data()})
            });
            setSubmitForms(forms);
        });
        return () => unsubcribe();
    }, []);

    return [submitForms];
}

export default useSubmitForm;