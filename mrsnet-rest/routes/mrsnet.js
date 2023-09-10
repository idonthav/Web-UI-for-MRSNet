const router = require("express").Router();
const {
  process,
  traverseDirectory,
  traverseModel,
} = require("../utils/commons");
const config = require("../config");
const multer = require("multer");
const upload = multer({ dest: config.datasetPath });
const AdmZip = require("adm-zip");
/**
 * Upload datasets （上传datasets）
 */
// Router dealing with iploaded file (处理文件上传的路由)
router.post("/upload/dataset", upload.single("file"), (req, res) => {
  // req.file containes info of uploaded files (req.file 包含上传的文件信息)
  // Process after file uploaded (处理文件上传后的逻辑)
  const filepath = req.file.path;
  const unzipPath = req.file.path + "_unzip";
  try {
    const zip = new AdmZip(filepath);
    zip.extractAllTo(unzipPath, true);
  } catch (error) {
    res.send({
      code: 500,
      message: "Please upload A Zip file",
    });
    return;
  }

  res.send({
    code: 200,
    message: "Upload successfully",
    data: unzipPath,
  });
});
/**
 * Search for all tensorflow models (自动搜索所有的Model）
 */
router.get("/model", (req, resp) => {
  let list = [];
  traverseModel(config.modelPath, list);
  list = list.map((item) => {
    return item.replace(/\\+/g, "/");
  });
  resp.send({
    code: 200,
    message: "Excute successfully",
    data: { list, modelPath: config.modelPath },
  });
});

/**
 * Call to excute system command line subcommand (远程调用执行系统命令函数)
 */
router.post("/process", (req, resp) => {
  const { command } = req.body;
  process(config.shellPath + command)
    .then((result) => {
      resp.send({
        code: 200,
        message: "执行成功",
        data: result,
      });
    })
    .catch((err) => {
      resp.send({
        code: 500,
        error: err,
      });
    });
});

/**
 * Retrive all Img files under fiels (获取文件夹下所有的图片文件)
 */
router.get("/images", (req, resp) => {
  const dirPath = req.query.dir || ".";
  const images = traverseDirectory(dirPath, 1).filter((image) => {
    return (
      image.endsWith("png") ||
      image.endsWith("jpg") ||
      image.endsWith("jpeg") ||
      image.endsWith("gif") ||
      image.endsWith("webp")
    );
  });
  resp.send({
    code: 200,
    message: "Query successfully",
    data: images,
  });
});

/**
 * Retrive all CSV files under fiels (获取文件夹下所有的csv文件)
 */
router.get("/csv", (req, resp) => {
  const dirPath = req.query.dir || ".";
  const csvList = traverseDirectory(dirPath, 1).filter((image) => {
    return image.endsWith("csv");
  });
  resp.send({
    code: 200,
    message: "Query successfully",
    data: csvList,
  });
});

/**
 * Download system files (下载系统中文件）
 */
router.get("/download", (req, resp) => {
  const path = req.query.path;
  resp.download(path, (err) => {
    resp.status(500).send(err);
  });
});

module.exports = router;
