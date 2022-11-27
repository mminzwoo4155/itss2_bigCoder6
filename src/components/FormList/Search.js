import React from "react";

const Search = ({query, onchange}) => {
    return (
        <div className="block control">
            <input 
                className="input is-primary"
                type="text"
                placeholder="Search here"
                value={query}
                onChange={e => onchange(e.currentTarget.value)}
            />
        </div>
    );
}

export default Search;
