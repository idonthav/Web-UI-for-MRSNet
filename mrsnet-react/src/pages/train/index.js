import { Button, Form, Input, Spin } from "antd";
import React from "react";
import { exec } from "../../api/process";
import "./index.css";

function Train() {
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
          <Form
            labelCol={{ span: 2 }}
            name="basic"
            onFinish={(values) => {
              const { validate, e, d, m } = values;
              const executeCommand = `mrsnet.py train -d ${d} -e ${e} --validate ${validate} -m ${m} -vv`;
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
              label="-d"
              name="d"
              rules={[
                {
                  required: true,
                  message: "Please enter your -d!",
                },
              ]}
            >
              <Input placeholder="Please enter -d parameters" />
            </Form.Item>
            <Form.Item
              label="-e"
              name="e"
              rules={[
                {
                  required: true,
                  message: "Please enter your -e!",
                },
              ]}
            >
              <Input placeholder="Please enter -e parameters" />
            </Form.Item>
            <Form.Item
              label="validate"
              name="validate"
              rules={[
                {
                  required: true,
                  message: "Please enter your validate!",
                },
              ]}
            >
              <Input placeholder="Please enter Validate parameters" />
            </Form.Item>
            <Form.Item
              label="-m"
              name="m"
              rules={[
                {
                  required: true,
                  message: "Please enter your -m!",
                },
              ]}
            >
              <Input placeholder="Please enter -m parameters" />
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
        </div>
      </div>
    </Spin>
  );
}

export default Train;
