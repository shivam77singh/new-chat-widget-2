async function postData(url = "", data) {
  const response = await fetch(url, {
    method: "POST",
    body: data,
  });
  return response.json();
}

export const makePostRequest = (data) => {
  postData("/api", data).then((data) => {
    // setTheme(data);
  });
};

const formatStyle = (data) => {
  //do some processing and return an object
  return data;
};
export const setTheme = (data) => {
  const theme = formatStyle(data);
  console.log(theme, "teheme");
  Object.keys(theme).map((key) => {
    const value = theme[key];
    document.documentElement.style.setProperty(key, value);
  });
};

setTimeout(() => {
  setTheme({
    "--header-color": "rgb( 248, 76, 98",
    "--primary-color": "rgb( 248, 76, 98",
    "--secondary-color": "rgb(255 117 135)",
  });
}, 4000);
