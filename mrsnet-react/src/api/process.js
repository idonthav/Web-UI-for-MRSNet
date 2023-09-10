import request from "../utils/request";

export function exec({ command }) {
  return request({
    url: "/process",
    method: "post",
    data: { command },
  });
}

export function getImages({ dir }) {
  return request({
    url: "/images",
    method: "get",
    params: { dir },
  });
}

export function getCsvs({ dir }) {
  return request({
    url: "/csv",
    method: "get",
    params: { dir },
  });
}

export function getConfig() {
  return request({
    url: "/config",
    method: "get",
  });
}

export function login(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}

export function getModel() {
  return request({
    url: "/model",
    method: "get",
  });
}
