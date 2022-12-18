import { Pagination } from "antd";
import React, { useMemo } from "react";
import { useState } from "react";
import { mockData } from "../../mock/data";
import Search from "../FormList/Search";
import FormList from "../FormList";
import useFormStorage from "../../hook/formStorage";
import { useEffect } from "react";
import { getAllForms } from "../../firebase/firestore/formStorage";

// const { Content } = Layout;

const PageSize = 10;
const MainContent = () => {
  const [query, putQuery] = useState("");
  // const [forms, putForms] = useState([]);

  // Un-comment this to use data from firestore
  const [forms] = useFormStorage();

  const getData = () => {
    let formList = forms;
    if (query) {
      formList = forms.filter((form) =>
        form.title.toLowerCase().match(query.toLowerCase())
      );
    }
    return { displayList: formList };
  };

  const { displayList } = getData();
  const [currentPage, setCurrentPage] = useState(1);

  const currentDisplayPage = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return displayList.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, displayList]);

  const handleSearch = (query) => {
    putQuery(query);
  };
  const onChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="main-content">
      <div className="title">Danh sách đơn</div>
      <Search query={query} onchange={handleSearch} />
      <FormList data={currentDisplayPage} />
      <Pagination
        className="pagination"
        current={currentPage}
        onChange={onChange}
        total={displayList.length}
        pageSize={PageSize}
      />
    </div>
  );
};

export default MainContent;
