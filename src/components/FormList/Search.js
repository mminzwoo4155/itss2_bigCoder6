import React from "react";
import { Input } from "antd";

const Search = ({ query, onchange }) => {
  return (
    <div className="block control">
      <Input
        style={{
          borderRadius: "10px",
          width: "300px",
        }}
        // prefix={<IconSearc}
        className="input is-primary"
        type="text"
        placeholder="Search here"
        value={query}
        onChange={(e) => onchange(e.currentTarget.value)}
      />
    </div>
  );
};

export default Search;
