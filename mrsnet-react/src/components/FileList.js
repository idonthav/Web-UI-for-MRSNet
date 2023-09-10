import { Button, Card, Image, List, message } from "antd";
import React from "react";
import { getCsvs, getImages } from "../api/process";
import { baseURL } from "../utils/request";

function FileList({ dir, type = "image" }) {
  console.log(dir);
  const [files, setFiles] = React.useState([]);
  function refreshFiles() {
    if (dir !== "") {
      if (type === "image") {
        return getImages({ dir }).then((res) => {
          setFiles(res);
        });
      } else {
        return getCsvs({ dir }).then((res) => {
          setFiles(res);
        });
      }
    }
  }
  // When change Path (当路径更改时)
  React.useEffect(() => {
    refreshFiles();
  }, [dir]);

  return (
    <Card
      title={`${type.toUpperCase()} LIST`}
      extra={
        <Button
          type="primary"
          onClick={() => {
            refreshFiles().then(() => {
              message.success("load " + type + " successfully!");
            });
          }}
        >
          Refresh
        </Button>
      }
    >
      <List>
        {files.map((name, i) => {
          return (
            <List.Item
              key={i}
              extra={
                type === "image" ? (
                  <Image
                    src={`${baseURL}download?path=${dir}/${name}`}
                    width={50}
                    height={50}
                  ></Image>
                ) : (
                  <Button
                    type="default"
                    onClick={() => {
                      window.open(`${baseURL}download?path=${dir}/${name}`);
                    }}
                  >
                    下载
                  </Button>
                )
              }
            >
              {name}
            </List.Item>
          );
        })}
      </List>
    </Card>
  );
}

export default FileList;
