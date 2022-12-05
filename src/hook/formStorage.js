import { useEffect, useState } from "react";
import { getAllForms } from "../firebase/firestore/formStorage";

const useFormStorage = () => {
    const [forms, setForms] = useState([]);

    useEffect(() => {
        getForms().catch(console.error);
    }, []);

    const getForms = async () => {
        const forms = await getAllForms();
        setForms(forms);
    }

    return [forms];
}

export default useFormStorage;
