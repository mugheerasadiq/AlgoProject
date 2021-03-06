import React, { useState, useEffect } from "react";
import GenerateTestCase from "../functions/TestCase123";
import { Table, Button } from "antd";
import SaveTestCase from "../functions/saveTestCase";

function calculateLevDistance(src, tgt) {
  var realCost;

  var srcLength = src.length,
    tgtLength = tgt.length,
    tempString,
    tempLength; // for swapping

  var resultMatrix = new Array();
  resultMatrix[0] = new Array(); // Multi dimensional

  // To limit the space in minimum of source and target,
  // we make sure that srcLength is greater than tgtLength
  if (srcLength < tgtLength) {
    tempString = src;
    src = tgt;
    tgt = tempString;
    tempLength = srcLength;
    srcLength = tgtLength;
    tgtLength = tempLength;
  }

  for (var c = 0; c < tgtLength + 1; c++) {
    resultMatrix[0][c] = c;
  }

  for (var i = 1; i < srcLength + 1; i++) {
    resultMatrix[i] = new Array();
    resultMatrix[i][0] = i;
    for (var j = 1; j < tgtLength + 1; j++) {
      realCost = src.charAt(i - 1) == tgt.charAt(j - 1) ? 0 : 1;
      resultMatrix[i][j] = Math.min(
        resultMatrix[i - 1][j] + 1,
        resultMatrix[i][j - 1] + 1,
        resultMatrix[i - 1][j - 1] + realCost // same logic as our previous example.
      );
    }
  }

  return resultMatrix[srcLength][tgtLength];
}

const ED = () => {
  const columns = [
    {
      title: "String 1",
      dataIndex: "String1",
      width: 150,
      ellipsis: true,
    },
    {
      title: "String 2",
      dataIndex: "String2",
      width: 150,
    },
    {
      title: "Output for TestCase",
      dataIndex: "Output",
      fixed: "right",
      width: 50,
    },
  ];

  const [dataSource, setDataSource] = useState([]);
  const [tempCase, settempCase] = useState(``);

  useEffect(() => {
    const updateSource = [...dataSource];
    let TempTestcase = ``;

    for (let i = 0; i < 10; i++) {
      let String1 = GenerateTestCase();
      let String2 = GenerateTestCase();

      updateSource.push({
        String1: String1,
        String2: String2,
        Output: "",
      });

      TempTestcase = `${TempTestcase} ${String1} ${String2} \n`;
    }

    setDataSource(updateSource);
    settempCase(TempTestcase);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        The Levenshtein distance (Edit distance) problem
      </h1>
      <p>
        Note: Please select the row to generate the output for a particular test
        case. The below test cases are randomly generated by using a function.
      </p>

      <Button
        style={{ marginLeft: 5, marginBottom: 10 }}
        type="primary"
        onClick={() => {
          return SaveTestCase(tempCase, "EDTestCase.txt", "text/plain");
        }}
      >
        Download Test Cases
      </Button>

      <Table
        columns={columns}
        dataSource={dataSource}
        onRow={(record) => ({
          onClick: () => {
            let newOutput;

            newOutput = calculateLevDistance(record.String1, record.String2);

            let updatedSource = [...dataSource];

            updatedSource = updatedSource.map((item) => {
              if (item.String1 === record.String1) {
                return {
                  ...record,
                  Output: newOutput,
                };
              } else {
                return item;
              }
            });
            setDataSource(updatedSource);
          },
        })}
      />
    </div>
  );
};

export default ED;
