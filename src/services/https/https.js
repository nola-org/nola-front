import axios from "axios";
import { instance } from "../axios";
// 1234567A-z


// ----------Account---------
export const getAccountApi = async () => {
  const data = await instance.get("/Account", {});
  return data;
};

// =======
export const postAccoutApi = async (body) => {
  const {data} = await instance.post("https://.../account", body);
return data
};

export const patchAccoutApi = async (id, { ...body }) => {
  const {data} = await instance.put(`https://.../account/${id}`, body);
return data
};
// =======



// -----------POSTS-------------
export const getAllPostApi = async () => {
  return await instance.get("/advertisements");
};

export const getPostIdApi = async (id) => {
  return await instance.get(`/advertisements/${id}`);
};

export const postPostApi = async (post) => {
  const { data } = await instance.post(`/Advertisements`, post);
  return data;
};

export const patchPostApi = async (id, { ...body }) => {
  const data = await instance.patch(`/Advertisements/${id}`, body, {});
  return data;
};

export const deletePostApi = async (id) => {
  const { data } = await instance.delete(`/Advertisements/${id}`);
  return data;
};



// -----------POST-------------
export const getAllAdverticerPostApi = async (token) => {
  try {
    return fetch("https:... /POST ??", {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getPostApi = async (token, id) => {
  try {
    return fetch(`https://.../POST ??/${id}`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

// -----------LiNKS-------------
export const getLinksApi = async (token) => {
  try {
    const { data } = await axios.get("https://.../account/  LINKS ??", {
      headers: { Authorization: `${token}` },
    });
    return data;
  } catch (error) {
    return error;
  }
};

export const postLinksApi = async (token, links) => {
  try {
    await fetch("https://.../account/  LINKS ?? ", {
      method: "POST",
      body: JSON.stringify(links),
      headers: {
        "Content-type": "application/json",
        Authorization: `${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLinksApi = async (token, id) => {
  const { data } = await axios.delete(`https://.../account/  LINKS ?? /${id}`, {
    headers: { Authorization: `${token}` },
  });
  return data;
};
