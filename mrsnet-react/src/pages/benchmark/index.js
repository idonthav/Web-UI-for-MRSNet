import { Spin } from "antd";
import React from "react";
import { exec } from "../../api/process";
import FileList from "../../components/FileList";
import ModelList from "../../components/ModelList";
import "./index.css";

function Benchmark() {
  const [benchmarkImagePath, setBenchmarkImagePath] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [result, setResult] = React.useState({
    images: [],
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
            execute={(value) => {
              const {model} = value
              setBenchmarkImagePath(model);
              const executeCommand = `mrsnet.py benchmark --model ${model} -vv`;
              // Exceute (模拟执行)
              setLoading(true);
              // Computational result (模拟结果)
              exec({
                // command: "java -version",
                command: executeCommand,
              })
                .then((data) => {
                  setResult({
                    images: ["/1.png", "/2.png"],
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
          ></ModelList>
        </div>
        <div className="result-container">
          {result.text ? (
            <div className="result-text">
              <p>$ {result.command}</p>
              <p style={{ whiteSpace: "pre-wrap" }}>{result.text}</p>
            </div>
          ) : (
            <></>
          )}
          <div className="result-image">
            <FileList dir={benchmarkImagePath} type="image" />
          </div>
          <div className="result-image">
            <FileList dir={benchmarkImagePath} type="csv" />
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default Benchmark;
