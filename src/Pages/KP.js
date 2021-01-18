import React, { useState, useEffect } from "react";
import GenerateTestCase from "../functions/TestCase68";
import { Table } from "antd";

function knapsack(items, capacity) {
  // This implementation uses dynamic programming.
  // Variable 'memo' is a grid(2-dimentional array) to store optimal solution for sub-problems,
  // which will be later used as the code execution goes on.
  // This is called memoization in programming.
  // The cell will store best solution objects for different capacities and selectable items.
  var memo = [];

  // Filling the sub-problem solutions grid.
  for (var i = 0; i < items.length; i++) {
    // Variable 'cap' is the capacity for sub-problems. In this example, 'cap' ranges from 1 to 6.
    var row = [];
    for (var cap = 1; cap <= capacity; cap++) {
      row.push(getSolution(i, cap));
    }
    memo.push(row);
  }

  // The right-bottom-corner cell of the grid contains the final solution for the whole problem.
  return getLast();

  function getLast() {
    var lastRow = memo[memo.length - 1];
    return lastRow[lastRow.length - 1];
  }

  function getSolution(row, cap) {
    const NO_SOLUTION = { maxValue: 0, subset: [] };
    // the column number starts from zero.
    var col = cap - 1;
    var lastItem = items[row];
    // The remaining capacity for the sub-problem to solve.
    var remaining = cap - lastItem.w;

    // Refer to the last solution for this capacity,
    // which is in the cell of the previous row with the same column
    var lastSolution =
      row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
    // Refer to the last solution for the remaining capacity,
    // which is in the cell of the previous row with the corresponding column
    var lastSubSolution =
      row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;

    // If any one of the items weights greater than the 'cap', return the last solution
    if (remaining < 0) {
      return lastSolution;
    }

    // Compare the current best solution for the sub-problem with a specific capacity
    // to a new solution trial with the lastItem(new item) added
    var lastValue = lastSolution.maxValue;
    var lastSubValue = lastSubSolution.maxValue;

    var newValue = lastSubValue + lastItem.v;
    if (newValue >= lastValue) {
      // copy the subset of the last sub-problem solution
      var _lastSubSet = lastSubSolution.subset.slice();
      _lastSubSet.push(lastItem);
      return { maxValue: newValue, subset: _lastSubSet };
    } else {
      return lastSolution;
    }
  }
}

// var capacity = 296;
// console.log(knapsack(items, capacity));

const KP = () => {
  const columns = [
    {
      title: "Weights",
      dataIndex: "weight",
      width: 150,
    },
    {
      title: "Values",
      dataIndex: "value",
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
  const [globalTestCase, setGlobalTestCase] = useState([]);

  useEffect(() => {
    const updateSource = [...dataSource];
    const updateTestCase = [...globalTestCase];

    for (let i = 0; i < 10; i++) {
      let testcase = GenerateTestCase();

      updateTestCase.push(testcase[1]);
      updateTestCase.push(testcase[3]);

      updateSource.push({
        weight: testcase[0],
        value: testcase[2],
        Output: "",
        key: i,
      });
    }
    setGlobalTestCase(updateTestCase);
    setDataSource(updateSource);
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>0-1 Knapsack Problem</h1>
      <p>
        Note: Please select the row to generate the output for a particular test
        case. The below test cases are randomly generated by using a function.
        <br />
        Total capacity of bag: 296
      </p>

      <Table
        columns={columns}
        dataSource={dataSource}
        onRow={(record) => ({
          onClick: () => {
            let newOutput;

            let items = [];

            let traceArray = new Array(10);
            for (let i = 0; i < 10; i++) {
              traceArray[i] = 0;
            }

            traceArray[record.key] = 1;

            let counter = 0;
            let i = 0;
            for (i = 0; i < 10; i++) {
              if (traceArray[i] === 1) {
                break;
              }
            }

            counter = i * 2;

            for (let i = 0; i < globalTestCase[counter + 1].length; i++) {
              let w = globalTestCase[counter][i];
              let v = globalTestCase[counter + 1][i];
              items.push({
                w: w,
                v: v,
              });
            }

            newOutput = knapsack(items, 296);

            let updatedSource = [...dataSource];

            updatedSource = updatedSource.map((item) => {
              if (item.key === record.key) {
                return {
                  ...record,
                  Output: newOutput.maxValue,
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

export default KP;
