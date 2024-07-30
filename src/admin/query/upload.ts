import { serverHeader, serverURL } from "../data/stuff";
import axios from "axios";
const create = axios.create();

export async function uploadSingleFile(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("attachment", file);
  });
  const res = create.post(serverURL + "/upload-single", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return res;
}

export async function uploadThumbnailFile(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("attachment", file);
  });
  const res = create.post(serverURL + "/upload-thumbnail", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return res;
}

export async function uploadMultipleFile(files: File[]) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("attachment", file);
  });
  const res = create.post(serverURL + "/upload", formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
  return res;
}
