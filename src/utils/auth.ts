// 회원가입
type signupBody = {
  email: string;
  nick: string;
  password: string;
};

const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3030"
    : "https://web-production-d139.up.railway.app";

export async function postSignup(body: signupBody) {
  try {
    const signupResult = fetch(`${API_URL}/auth/signUp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => data);

    return signupResult;
  } catch (err) {
    console.error(err);
  }
}

type signinBody = {
  email: string;
  password: string;
};
// 로그인
export async function postSignin(body: signinBody) {
  try {
    const signinResult = fetch(`${API_URL}/auth/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => data);
    return signinResult;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserMe() {
  const accessToken = localStorage.getItem("at");
  if (accessToken === null) {
    const data = {
      code: 403,
      message: "access token이 없습니다",
    };
    return data;
  }
  try {
    const response = await fetch(`${API_URL}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const userInfo = await response.json();

    if (userInfo.at) {
      // at가 새로 만들어져서 왔음
      localStorage.setItem("at", userInfo.at);
    }

    return userInfo;
  } catch (err) {
    console.error("fetch error", err);
  }
}
