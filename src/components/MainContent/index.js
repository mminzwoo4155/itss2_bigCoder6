import { Col, Dropdown, Pagination, Row, Space, Typography } from "antd";
import React, { useMemo } from "react";
import { useState } from "react";
import Search from "../FormList/Search";
import FormList from "../FormList";
import useFormStorage from "../../hook/formStorage";
import { DownOutlined } from "@ant-design/icons";

const PageSize = 10;
const queryByItems = [
  {
    key: 'title',
    label: 'Tiêu đề',
  },
  {
    key: 'short_des',
    label: 'Mô tả ngắn',
  },
  {
    key: 'full_des',
    label: 'Mô tả đầy đủ',
  }
];

const MainContent = () => {
  const [query, putQuery] = useState("");
  const [queryBy, putQueryBy] = useState("title");
  const [forms] = useFormStorage();

  const getData = () => {
    let formList = forms;
    if (query) {
      switch(queryBy){
        case 'title': 
          formList = forms.filter((form) =>
            form.title.toLowerCase().match(query.toLowerCase())
          );
          break;
        case 'short_des':
          formList = forms.filter((form) =>
            form.short_description.toLowerCase().match(query.toLowerCase())
          );
          break;
        case 'full_des':
          formList = forms.filter((form) =>
            form.full_description.toLowerCase().match(query.toLowerCase())
          );
          break;
        default: break;
      }
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
  const handleQueryBySelect  = (e) => {
    console.log(e);
    putQueryBy(e.key)
  }
  const onChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="main-content">
      <div className="title">Danh sách đơn</div>
      <Row justify="center">
        <Col>
          <Search query={query} onchange={handleSearch} />
        </Col>
        <Col offset={1}>
          <Space size={6}>
          Tìm kiếm theo
          <Dropdown.Button
            icon={<DownOutlined/>}
            menu={{
              items: queryByItems,
              selectable: true,
              defaultSelectedKeys: ['title'],
              onClick: handleQueryBySelect,
            }}>
            {queryByItems.filter(item => item.key === queryBy)[0].label}
          </Dropdown.Button> 
          </Space>
        </Col>
      </Row>
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
