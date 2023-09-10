import { Button, Form, Input, message, Spin } from "antd";
import React from "react";
import "./index.css";
import FileList from "../../components/FileList";
import { exec } from "../../api/process";

function Simulate() {
  const { simulateImagePath } = JSON.parse(localStorage.getItem("config"));
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
          <Form
            labelCol={{ span: 2 }}
            name="basic"
            onFinish={(values) => {
              const { source, n, noise_sigma, sample } = values;
              const executeCommand = `mrsnet.py simulate –source ${source} –sample ${sample} –noise_sigma ${noise_sigma} -n ${n} -vv`;
              console.log("执行命令：", executeCommand);
              // Excute (模拟执行)
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
            onFinishFailed={() => {}}
            autoComplete="off"
          >
            <Form.Item
              label="Source"
              name="source"
              rules={[
                {
                  required: true,
                  message: "Please enter your source!",
                },
              ]}
            >
              <Input placeholder="Please enter Source parameters" />
            </Form.Item>
            <Form.Item
              label="Sample"
              name="sample"
              rules={[
                {
                  required: true,
                  message: "Please enter your Sample!",
                },
              ]}
            >
              <Input placeholder="Please enter Sample parameters" />
            </Form.Item>
            <Form.Item
              label="Noise Sigma"
              name="noise_sigma"
              rules={[
                {
                  required: true,
                  message: "Please enter your Noise Sigma!",
                },
              ]}
            >
              <Input placeholder="Please enter Noise Sigma parameters" />
            </Form.Item>
            <Form.Item
              label="N"
              name="n"
              rules={[
                {
                  required: true,
                  message: "Please enter your N!",
                },
              ]}
            >
              <Input placeholder="Please enter N parameters" />
            </Form.Item>
            <Form.Item label=" " colon={false}>
              <Button type="primary" htmlType="submit">
                Execute
              </Button>
            </Form.Item>
          </Form>
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
          <div
            className="result-image"
            style={{
              margin: "20px 0",
            }}
          >
            <FileList dir={simulateImagePath} type="image" />
          </div>
        </div>
      </div>
    </Spin>
  );
}

export default Simulate;
