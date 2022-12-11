import React, { useState } from "react";
import { Input, Radio, Space } from "antd";

const RadioGroup = ({ options, value, onChange }) => {
  const [radioValue, setRadioValue] = useState(value || 0);
  const onRadioChange = (e) => {
    onChange(e);
    setRadioValue(e.target.value);
  };
  return (
    <Radio.Group onChange={onRadioChange} value={radioValue}>
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
