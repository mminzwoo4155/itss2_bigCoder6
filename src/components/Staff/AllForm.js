import React from "react";
import useFormStorage from "../../hook/formStorage";
import { useState } from "react";
import { Button, Row, Table } from "antd";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import AddFormModal from "./AddFormModal";
const AllForm = () => {
  const [forms] = useFormStorage();
  const [query, putQuery] = useState("");
  const [isOpenModal, setIsOpenModal] = useState(false);
  const getData = () => {
    let formList = forms;
    if (query) {
      formList = forms.filter((form) =>
        form.title.toLowerCase().match(query.toLowerCase())
      );
    }
    return { displayList: formList };
  };
  // console.log(getData().displayList);
  const columns = [
    {
      title: "STT",
      render: (_, record, index) => <>{index + 1}</>,
    },
    {
      title: "Tên form",
      dataIndex: "title",
    },
    {
      title: "Mô tả",
      dataIndex: "short_description",
    },
    {
      title: "Số câu hỏi",
      render: (_, record) => <>{record?.fields?.length}</>,
    },
    {
      title: "Hành động",
      align: "center",
      render: (_, record) => (
        <EyeOutlined
          style={{
            cursor: "pointer",
          }}
          onClick={() => setIsOpenModal(true)}
        />
      ),
    },
  ];
  return (
    <div>
      <Row>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          style={{
            width: "100px",
            margin: "15px 0",
          }}
          title="Tạo form"
          onClick={() => setIsOpenModal(true)}
        >
          {/* Tạo form */}
        </Button>
      </Row>
      <Table
        columns={columns}
        dataSource={getData()?.displayList}
        rowKey={(item) => item.id}
      />
      <AddFormModal isOpen={isOpenModal} setIsOpen={setIsOpenModal} />
    </div>
  );
};

export default AllForm;
