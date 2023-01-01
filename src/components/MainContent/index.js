import { Button, Col, Dropdown, Pagination, Row, Space, Typography } from "antd";
import React, { useMemo } from "react";
import { useState } from "react";
import Search from "../FormList/Search";
import FormList from "../FormList";
import useFormStorage from "../../hook/formStorage";
import { DownOutlined } from "@ant-design/icons";
import { useRecStorage } from "../../hook/recStorage";

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
  const [recommend, putRecommend] = useState("");
  const [forms] = useFormStorage();
  const [recommendations] = useRecStorage();

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
    if(recommend){
      formList = formList.filter((form) =>
        form.recommend? form.recommend.includes(recommend) : false
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
  const handleQueryBySelect = (e) => {
    putQueryBy(e.key)
  };
  const handleRecSelect = (recId) => {
    console.log(recId);
    putRecommend(recId);
  };
  const onChange = (page) => {
    setCurrentPage(page);
  };
  return (
    <div className="main-content">
      <div className="title">Danh sách đơn</div>
      <Row justify="center" gutter={[8, 16]}>
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
      <br/>
      <Row justify="center">
        <Col>Không biết tìm gì? Hãy chọn 1 ở dưới</Col>
      </Row>
      <br/>
      <Row justify="center">
        <Col>
            <Space size={8}>
              {recommendations.map((item, i) => (
                <Button key={i} shape="round" onClick={() => handleRecSelect(item.key)}>
                  {item.label}
                </Button>
              ))}
            </Space>
        </Col>
      </Row>
      <br/>
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
