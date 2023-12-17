const host = process.env.NODE_ENV === 'development' ? "http://localhost:3030/": "https://noty-server.vercel.app/"

const request = async (method, url, data) => {
  const options = {
    method,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  if (data) {
    options.headers["content-type"] = "application/json";
    options.body = JSON.stringify(data);
  }

  try {
    const res = await fetch(host + url, options);
    if (!res.ok) {
      throw new Error(data.message);
    }
    const data = await res.json();
    if (res.status === 401) {
      localStorage.removeItem("moms_flowers_credentials");
    }
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const get = request.bind(null, "GET");
const post = request.bind(null, "POST");
const put = request.bind(null, "PUT");
const patch = request.bind(null, "PATCH");
const del = request.bind(null, "DELETE");

export { get, post, put, patch, del };