import { useEffect, useState } from "react"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const useSubmitForm = () => {
    const [submitForms, setSubmitForms] = useState([]);
    const { currentUser, currentProfile } = useAuth();

    useEffect(() => {
        if(currentProfile?.role === "staff" ) {
            const unsubcribe = db.collection("submit_form").orderBy("timestamp", "asc").onSnapshot((snapshot) => {
                var forms = [];
                snapshot.forEach((doc) => {
                    forms.push({id: doc.id, ...doc.data()})
                });
                setSubmitForms(forms);
            });
            return () => unsubcribe();
        } 
        if(currentProfile?.role === "student") {
            const unsubcribe = db.collection("submit_form").orderBy("timestamp", "desc").onSnapshot((snapshot) => {
                var forms = [];
                snapshot.forEach((doc) => {
                    forms.push({id: doc.id, ...doc.data()})
                });
                setSubmitForms(forms);
            });
            return () => unsubcribe();
        }
    }, []);

    return [submitForms];
}

export default useSubmitForm;