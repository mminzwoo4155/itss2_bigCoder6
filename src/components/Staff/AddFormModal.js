import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  notification,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import React from "react";
import { addForm } from "../../firebase/firestore/formStorage";
import { useRecStorage } from "../../hook/recStorage";

const AddFormModal = ({ isOpen, setIsOpen }) => {
  const handleClose = () => {
    setIsOpen(false);
  };
  const [recommendations] = useRecStorage();
  const [form] = Form.useForm();
  // const [count, setCount] = useState([1]);

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 4,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 20,
      },
    },
  };
  // const formItemLayoutWithOutLabel = {
  //   wrapperCol: {
  //     xs: {
  //       span: 24,
  //       offset: 0,
  //     },
  //     sm: {
  //       span: 20,
  //       offset: 4,
  //     },
  //   },
  // };
  const onSubmit = async (val) => {
    try {
      val.fields.forEach((field, i) => {
        field.key = `question${i+1}`;
        switch(field.type){
          case 'choice': 
            if(field.options){
              const newOptions = field.options.map((option, i) => {
                return {
                  ...option,
                  value: i,
                }
              });
              field.options = newOptions;
            };
            break;
          case 'text':
            delete field.options;
            break;
        }
      });
      await addForm(val);
      notification.success({
        message: 'Thêm đơn thành công',
      });
      setIsOpen(false);
    } catch (error) {
      notification.error({
        message: 'Đã có lỗi xảy ra',
        description: error.message
      })
    }
  };
  return (
    <Modal
      title="Tạo form"
      width="800px"
      open={isOpen}
      onCancel={handleClose}
      footer={null}
    >
      <Form form={form} onFinish={onSubmit} {...formItemLayout}>
        <Form.Item label="Tên form" name="title">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả ngắn" name="short_description">
          <Input />
        </Form.Item>
        <Form.Item label="Mô tả chi tiết" name="full_description">
          <Input.TextArea rows={5} />
        </Form.Item>
        {/* <Form.Item label="Thêm gợi lý liên quan" name="recommend">
          <Input.TextArea rows={5} />
        </Form.Item> */}
        <div>Thêm câu hỏi</div>
        <Form.List name="fields">
          {(fields, { add, remove }, { errors }) => (
            <>
              {fields.map((field, index) => (
                <Row
                  style={{
                    width: "80%",
                  }}
                  key={field.key}
                >
                  <Col span={20}>
                    <Form.Item
                      label={`Câu hỏi ${index + 1}`}
                      required={false}
                      name={[field.name, "Question"]}
                    >
                      <Input
                        placeholder="question"
                        style={{
                          width: "60%",
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      label="Kiểu"
                      name={[field.name, "type"]}
                    >
                      <Radio.Group>
                        <Radio value={`choice`}>Choice</Radio>
                        <Radio value={`text`}>Text</Radio>
                      </Radio.Group>
                    </Form.Item>
                    {/* {form.getFieldValue("fields", field.name, "type")[index]
                      ?.type === "choice" && ( */}
                    <Form.List name={[field.name, "options"]}>
                      {(options, { add, remove }, { errors }) => (
                        <>
                          {options.map((option, i) => (
                            <Row
                              key={option.key}
                              style={{
                                marginLeft: "60px",
                              }}
                            >
                              <Col span={16}>
                                <Form.Item
                                  labelCol={{
                                    span: 10,
                                  }}
                                  label={`Lựa chọn ${i + 1}`}
                                  name={[option.name, "label"]}
                                >
                                  <Input />
                                </Form.Item>
                              </Col>
                              <Col span={8}>
                                {options.length > -1 ? (
                                  <Row>
                                    <Button
                                      onClick={() => remove(option.name)}
                                      icon={<MinusCircleOutlined />}
                                    ></Button>
                                  </Row>
                                ) : null}
                              </Col>
                            </Row>
                          ))}
                          <Button
                            onClick={() => add()}
                            style={{
                              margin: "10px 50px",
                            }}
                            icon={<PlusOutlined />}
                          >
                            {/* Add field */}
                          </Button>
                        </>
                      )}
                    </Form.List>
                    {/* )} */}
                  </Col>
                  <Col span={4}>
                    {fields.length > 1 ? (
                      <Button
                        onClick={() => remove(field.name)}
                        icon={<MinusCircleOutlined />}
                      ></Button>
                    ) : null}
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => add()}
                  style={{
                    margin: "10px 0",
                  }}
                  icon={<PlusOutlined />}
                >
                  {/* Add field */}
                </Button>

                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          )}
        </Form.List>
        <Row>
          <Button
            style={{
              margin: "0 20px",
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddFormModal;
