"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUser from "../hooks/useUser";

const MyInfo = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const { mutate, user, isLoading } = useUser();

  const [message, setMessage] = useState("");
  const [count, setCount] = useState(0);
  const router = useRouter();

  const commentPost = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch("http://localhost:3030/comment", {
      method: "POST",
      body: JSON.stringify({ content: "Hello!~", eventId: 277 }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log("data", data);
  };

  const commentSearch = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch("http://localhost:3030/user/comments", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log("data", data);
  };

  const commentUpdate = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch("http://localhost:3030/comment/4", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ content: "new Content" }),
    });
    const data = await response.json();
    console.log("data", data);
  };

  const deleteComment = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch("http://localhost:3030/comment/8", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });
    const data = await response.json();
    console.log("data", data);
  };

  const myFavoriteEvent = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch("http://localhost:3030/user/liked-events", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log("data", data);
  };

  const favoriteToggle = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch("http://localhost:3030/v2/events/277/likes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await response.json();
    console.log("data", data);
    setMessage(data.message);
  };

  const favoriteCount = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch("http://localhost:3030/v2/events/277/likes", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    });

    const data = await response.json();
    setCount(data.count);
    console.log("data", data);
  };

  const getEventsComments = async () => {
    const accessToken = localStorage.getItem("at");
    const response = await fetch(
      "http://localhost:3030/v2/events/277/comments",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
      }
    );

    const data = await response.json();
    console.log("data", data);
  };

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push("/");
      } else {
        setNickname(user.nick);
        setEmail(user.email);
      }
    }
  }, [user]);

  const logoutHanlder = () => {
    localStorage.removeItem("at");
    mutate(
      { email: "", nick: "" },
      {
        optimisticData: { email: "", nick: "" },
      }
    );
    router.push("/");
  };

  return (
    <div className="flex flex-col max-w-[900px] w-full items-center gap-10 mt-[100px]">
      <div className="flex gap-4">
        <div className="border rounded-full p-4 border-gray-600">
          <Image
            alt="avatar"
            src="/avatar-svgrepo-com.svg"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-col gap-4 justify-center">
          <span className="flex justify-start">email: {email}</span>
          <div className="flex gap-10 justify-center items-center">
            <span>nickname: {nickname}</span>
            <button className="border p-2 rounded-lg bg-blue-400 text-white">
              닉네임 변경하기
            </button>
          </div>
        </div>
      </div>
      <button
        className="border p-2 rounded-lg bg-rose-400 text-white"
        onClick={logoutHanlder}
      >
        로그아웃
      </button>

      <button
        className="border p-2 rounded-lg bg-green-500 text-white"
        onClick={commentPost}
      >
        댓글 테스트
      </button>

      <button
        className="border p-2 rounded-lg bg-green-800 text-white"
        onClick={commentUpdate}
      >
        댓글 수정하기
      </button>

      <button
        className="border p-2 rounded-lg bg-red-600 text-white"
        onClick={deleteComment}
      >
        댓글 삭제하기
      </button>

      <button
        className="border p-2 rounded-lg bg-blue-600 text-white"
        onClick={commentSearch}
      >
        댓글 조회
      </button>

      <button
        className="border p-2 rounded-lg bg-amber-300 text-white"
        onClick={myFavoriteEvent}
      >
        내가 좋아하는 이벤트
      </button>

      <button
        className="border p-2 rounded-lg bg-fuchsia-400 text-white"
        onClick={favoriteToggle}
      >
        좋아요 테스트
      </button>
      <div>{message}</div>

      <button
        className="border p-2 rounded-lg bg-orange-600 text-white"
        onClick={favoriteCount}
      >
        좋아요 조회
      </button>
      <div>좋아요 카운트: {count} </div>

      <button
        className="border p-2 rounded-lg bg-cyan-400 text-white"
        onClick={getEventsComments}
      >
        이벤트에 달린 댓글 조회
      </button>
    </div>
  );
};

export default MyInfo;
