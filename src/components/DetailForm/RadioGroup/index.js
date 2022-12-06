import React, { useState } from "react";
import { Input, Radio, Space } from "antd";
const RadioGroup = ({ options }) => {
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onChange} value={value}>
      <Space direction="vertical">
        {options.map((item) => (
          <Radio value={item.value} key={item.value}>
            {item.label}
          </Radio>
        ))}
      </Space>
    </Radio.Group>
  );
};
export default RadioGroup;
