import { useEffect, useState } from "react"
import { getAllRecommend } from "../firebase/firestore/recommendStorage";

export const useRecStorage = () => {
    const [recommendations, putRecommend] = useState([]);

    useEffect(() => {
        const getData = async () => {
            const res = await getAllRecommend();
            putRecommend(res);
        }

        getData().catch((err) => console.log(err));
    }, []);

    return [recommendations];
}