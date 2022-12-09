import React from "react";
import { Form, Input } from "antd";
import RadioGroup from "../RadioGroup";

const Question = ({ itemData }) => {
    switch(itemData.type){
        case 'choice':
            return (
                <RadioGroup options={itemData?.options}/>
            );
        case 'text':
            return (
                <Input placeholder="Cau tra loi cua ban"/>
            );
        default: return null;
    }
}

export default Question;