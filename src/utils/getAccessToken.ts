export const getAccessToken = () => {
  return localStorage.getItem("at");
};

export const setAccessToken = (token: string) => {
  localStorage.setItem("at", token);
};
