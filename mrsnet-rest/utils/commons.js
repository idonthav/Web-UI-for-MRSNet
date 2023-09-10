const { exec } = require("child_process");
const fs = require("fs");
const iconv = require("iconv-lite");
const path = require("path");
const config = require("../config");

function traverseModel(dirPath, list = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (file === "tf_model") {
      list.push(dirPath);
    }
    if (stats.isDirectory()) {
      traverseModel(filePath, list);
    }
  });
}

/**
 * Traverse folder files (遍历文件夹文件）
 * @param {*} dirPath file path (文件夹路径)
 * @param {*} level levels of directories traversed (需要遍历几级目录)
 * @param {*} current Currern level of directory (当前是第几级)
 * @param {*} list saved file path (存储的文件路径)
 * @returns file array (文件数组)
 */
function traverseDirectory(dirPath = ".", level = 0, current = 1, list = []) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isFile()) {
      list.push(file);
      // Process files Here (在这里可以对文件进行处理)
    } else if (stats.isDirectory()) {
      if (level > current || level === 0) {
        traverseDirectory(filePath, level, current++, list);
      }
    }
  });
  return list;
}

/**
 * Excute command and return result (执行命令，并返回执行的结果)
 * @param {*} command Command (命令)
 * @returns Promise<String>
 */
function process(command) {
  return new Promise((resolve, reject) => {
    exec(command, { encoding: "buffer" }, (error, stdout, stderr) => {
      const print =
        iconv.decode(stderr, config.encoding) +
        iconv.decode(stdout, config.encoding);
      if (error) {
        reject(print);
      } else {
        resolve(print);
      }
    });
  });
}

module.exports = {
  process,
  traverseDirectory,
  traverseModel,
};
