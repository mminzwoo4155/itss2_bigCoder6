import { useEffect, useState } from "react"
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

const useSubmitContribution = () => {
    const [submitContributions, setSubmitContributions] = useState([]);
    const { currentUser, currentProfile } = useAuth();

    useEffect(() => {
        if(currentProfile?.role === 'student') {
            const unsubcribe = db.collection("contribution").onSnapshot((snapshot) => {
                var contributions = [];
                snapshot.forEach((doc) => {
                    contributions.push({id: doc.id, ...doc.data()})
                });
                setSubmitContributions(contributions);
            });
            return () => unsubcribe();
        }
    }, []);

    return [submitContributions];
}

export default useSubmitContribution;