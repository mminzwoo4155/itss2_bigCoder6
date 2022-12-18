import { useEffect, useState } from "react";
import { db } from "../firebase";

const useFormStorage = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        const unsubcribe = db.collection("forms").onSnapshot((snapshot) => {
            var snapForms = [];
            snapshot.docs.forEach((doc) => {
                snapForms.push({ id: doc.id, ...doc.data() })
            });
            setForms(snapForms);
        })

        return () => unsubcribe();
    }, []);

    return [forms];
}

export default useFormStorage;
