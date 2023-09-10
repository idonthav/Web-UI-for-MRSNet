import { Spin } from "antd";
import React from "react";
import { exec } from "../../api/process";
import FileList from "../../components/FileList";
import ModelList from "../../components/ModelList";
import "./index.css";

function Quantify() {
  const [quanfityCsvPath, setQuanfityCsvPath] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState({
    text: "",
    command: "",
  });

  return (
    <Spin spinning={loading} tip="加载中">
      <div
        style={{
          width: 1200,
          margin: "0 auto",
          minHeight: 500,
        }}
      >
        <div className="execute-form">
          <ModelList
            showDataset={true}
            execute={(values) => {
              const { model, dataset } = values;
              const executeCommand = `mrsnet.py quantify -d ${dataset} -m ${model} -vv`;

              setQuanfityCsvPath(model);
              // Excute (模拟执行)
              setLoading(true);
              // Computational result (模拟结果)
              exec({
                // command: "java -version",
                command: executeCommand,
              })
                .then((data) => {
                  setResult({
                    text: data,
                    command: executeCommand,
                  });
                })
                .catch((error) => {
                  setResult({
                    images: [],
                    text: error,
                    command: executeCommand,
                  });
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          />
        </div>
        <div className="result-container">
          {result.text ? (
            <>
              <div className="result-text">
                <p>$ {result.command}</p>
                <pre>{result.text}</pre>
              </div>
            </>
          ) : (
            <></>
          )}
          <div style={{ margin: "20px 0" }}>
            <FileList dir={quanfityCsvPath} type="csv" />
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default Quantify;
