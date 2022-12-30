import React from "react";
import { Input } from "antd";

const Search = ({ query, onchange }) => {
  return (
    <div className="block control">
      <Input
        style={{
          borderRadius: "10px",
          width: "400px",
        }}
        // prefix={<IconSearc}
        className="input is-primary"
        type="text"
        placeholder="Tìm kiếm ở đây"
        value={query}
        onChange={(e) => onchange(e.currentTarget.value)}
      />
    </div>
  );
};

export default Search;
