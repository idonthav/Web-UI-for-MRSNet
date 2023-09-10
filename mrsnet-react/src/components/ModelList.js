import React from "react";
import { Card, Button, Form, Input, List, Radio, message, Upload } from "antd";
import { getModel } from "../api/process";
import { UploadOutlined } from "@ant-design/icons";
import { baseURL } from "../utils/request";

const ShowHiiden = ({ show, children }) => {
  return <>{show ? children : null}</>;
};

function ModelList({ children, execute, showDataset = false }) {
  const [model, setModel] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [dataset, setDataset] = React.useState("");
  const [value, setValue] = React.useState("");

  // retrive model (获取model)
  React.useEffect(() => {
    getModel().then((res) => {
      setModel(
        res.list.map((item) => {
          return {
            value: item,
            label: item.replace(res.modelPath, ""),
          };
        })
      );
    });
  }, []);

  return (
    <>
      <Card
        title={"Model List"}
        extra={
          <>
            <Form
              layout="inline"
              onFinish={(values) => {
                setSearch(values.search);
              }}
            >
              <Form.Item
                name={"search"}
                label="Search: "
                required={true}
                rules={[{ required: true }]}
              >
                <Input placeholder="Please input" />
              </Form.Item>
              <ShowHiiden show={showDataset}>
                <Form.Item>
                  <Upload
                    name="file"
                    action={baseURL + "upload/dataset"}
                    maxCount={1}
                    onChange={(res) => {
                      if (res.file.status === "done") {
                        if (res.file.response.code === 500) {
                          message.error(res.file.response.message);
                          return;
                        }
                        const { data } = res.file.response;
                        setDataset(data.replace(/\\/g, "/"));
                        message.success("upload success");
                      }
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload Dataset</Button>
                  </Upload>
                </Form.Item>
              </ShowHiiden>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Search
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => {
                    if (showDataset) {
                      if (!dataset) {
                        message.error("Please upload dataset first");
                        return;
                      }
                    }
                    if (value) {
                      execute({
                        model: value,
                        dataset,
                      });
                    } else {
                      message.error("Please select model first");
                    }
                  }}
                >
                  Execute
                </Button>
              </Form.Item>
            </Form>
          </>
        }
      >
        <Radio.Group
          style={{ width: "100%" }}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        >
          <List>
            {model
              .filter((item) => {
                if (search) {
                  return item.value.indexOf(search) > -1;
                }
                return false;
              })
              .map((item) => {
                return (
                  <List.Item>
                    <Radio value={item.value}>{item.label}</Radio>
                  </List.Item>
                );
              })}
          </List>
        </Radio.Group>
      </Card>
    </>
  );
}

export default ModelList;
