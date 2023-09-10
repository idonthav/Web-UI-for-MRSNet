const config = {
  // Configure server port (配置服务器运行的端口)
  port: 3333,
  //Configure your 'mrsnet.py' path on your local machine (配置你的mrsnet.py路径). Here is mine on my virtual machine:
  shellPath: "/home/zhaoxin/mrsnet/code-mrsnet/", 
  // Configure your searched 'tensorflow' path on your local machine(要搜索的model路径).Here is mine on my virtual machine:
  modelPath: "/home/zhaoxin/mrsnet/code-mrsnet/",
  // Configure your 'dataset zip file' path (配置dataset的上传地址). Here is mine on my virtual machine:
  datasetPath:'/home/zhaoxin/mrsnet/code-mrsnet/',
  // Window confinged with 'GBK', other OS with 'UTF-8' (在Windows上执行配置GBK，在其他平台上配置UTF-8，可以避免乱码)
  encoding: "UTF-8",
  // Assigned with two users authorise: 'admin' and 'user' (配置权限认证的角色). Use one of them to log in system.
  users: [
    {
      username: "admin",
      password: "123456",
    },
    {
      username: "user",
      password: "123456",
    },
  ],
};

module.exports = config;
