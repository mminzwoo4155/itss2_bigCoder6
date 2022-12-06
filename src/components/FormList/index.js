import { Row, Col, Card } from "antd";
import React from "react";
// import { mockData } from "../../mock/data";
import { Link } from "react-router-dom";
import "./index.css";
const { Meta } = Card;

const FormList = ({ data }) => {
  console.log(data);
  return (
    <Row justify="space-between" className="form-list" align="bottom">
      {data.map((item, index) => (
        <Col span={7} key={index}>
          <Link to={`form/${item.id}`}>
            <Card
              bordered={false}
              cover={
                <img
                  alt="example"
                  style={{
                    width: "200px",
                    height: "200px",
                  }}
                  src="icon-form.jpg"
                />
              }
            >
              <Meta
                style={{
                  textAlign: "center",
                }}
                title={item.title}
                description={item.short_description}
              />
            </Card>
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default FormList;
