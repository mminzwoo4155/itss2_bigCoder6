import React from "react";
import { Form, Input } from "antd";
import RadioGroup from "../RadioGroup";

const Question = ({ itemData, value, onChange }) => {
    switch(itemData.type){
        case 'choice':
            return (
                <RadioGroup options={itemData?.options} value={value} onChange={onChange}/>
            );
        case 'text':
            return (
                <Input placeholder="Cau tra loi cua ban" value={value} onChange={onChange}/>
            );
        default: return null;
    }
}

export default Question;