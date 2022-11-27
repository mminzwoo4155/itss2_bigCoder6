import { Image } from "antd";
import React from "react";
// import { mockData } from "../../mock/data";
import "./index.css";

const FormList = ({data}) => {
  return (
    <div>
      {/* <div className="title">Mẫu đơn xin nghỉ việc</div> */}
      <div className="list-form">
        {data.map((item, index) => (
          <figure className="item" key={index}>
            <Image
              style={{
                width: "100%",
                height: "300px",
              }}
              src={item.src}
            />
            <figcaption
              style={{
                textAlign: "start",
              }}
            >
              {item.title}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default FormList;
