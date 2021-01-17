import React from "react";
import { Row, Col, Table } from "antd";

const IO = (input, output) => {
  const columns = [
    {
      title: "Randomly Generated TestCases",
      dataIndex: "TestCases",
    },
    {
      title: "Output for TestCases",
      dataIndex: "Output",
    },
  ];

  const dataSource = [
    {
      key: "1",
      TestCases: "Mugheera",
      Output: "Bin Sadiq",
    },
    {
      key: "2",
      Output: "Anas",
    },
  ];
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      onRow={(record) => ({
        onClick: () => {
          dataSource[1].TestCases = "New";
          return console.log(dataSource);
        },
      })}
    />
  );
};

export default IO;
