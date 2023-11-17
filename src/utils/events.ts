import { Comment, DetailEvent, Event, EventThumbnail } from "../types/events";
import { SimpleEvent, SimpleEventListWithPagination } from "./../types/events";

const API_BASE_URL = "http://localhost:3030";
const API_V1 = `${API_BASE_URL}/v1/events`;
const API_V2 = `${API_BASE_URL}/v2/events`;
const API_COMMENT = `${API_BASE_URL}/comment`;

function getAccessToken() {
  return localStorage.getItem("at");
}

// 최신순
export async function getRecentEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const recentEvents = fetch(`${API_V1}/latest`, {
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => data.payload.rows);
    return recentEvents;
  } catch (e) {}
}

//인기순
export async function getHotEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const hotEvents = fetch(`${API_V1}/popular`, {
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => {
        return data.payload.rows;
      })
      .then((rows) =>
        rows.map((event: Event) => ({
          thumbnail: event.thumbnail,
          id: event.id,
          title: event.title,
        }))
      );

    return hotEvents;
  } catch (e) {}
}

// 상세정보
export async function getEventDetail(
  id: number,
  loggedOut: boolean
): Promise<DetailEvent | undefined> {
  const accessToken = getAccessToken();
  let detailEvent;

  if (loggedOut) {
    try {
      detailEvent = fetch(`${API_V1}/${id}`, {
        credentials: "include",
        next: { revalidate: 3600 },
      })
        .then((rs) => rs.json())
        .then((data) => data.payload);
    } catch {}
  } else {
    try {
      detailEvent = fetch(`${loggedOut ? API_V1 : API_V2}/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        next: { revalidate: 3600 },
      })
        .then((rs) => rs.json())
        .then((data) => data.payload);
    } catch {}
  }
  return detailEvent;
}

// 필터링-페이지네이션
export async function getFilteredEvents(
  location: string,
  category: string,
  cost: string,
  startDate: string,
  endDate: string,
  orderBy: string,
  pageIndex: number,
  pageSize: number
): Promise<SimpleEventListWithPagination | undefined> {
  const locationQuery = location && `location=${location}&`;
  const categoryQuery = category && `category=${category}&`;
  const costQuery = cost && `isfree=${cost}&`;
  const startDateQuery = startDate && `start=${startDate}&`;
  const endDateQuery = endDate && `end=${endDate}&`;
  const orderByQuery = orderBy && `orderBy=${orderBy}&`;
  const pageIndexQuery = `pageIndex=${pageIndex + 1}&`;
  const pageSizeQuery = `pageSize=${pageSize}`;

  const accessToken = getAccessToken();

  console.log(
    `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}${pageIndexQuery}${pageSizeQuery}`
  );

  try {
    const filteredEvents = fetch(
      `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}${pageIndexQuery}${pageSizeQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        next: { revalidate: 3600 },
      }
    )
      .then((rs) => rs.json())
      .then((data) => ({
        events: data.payload.rows,
        totalPage: data.totalPage,
      }));

    return filteredEvents;
  } catch (e) {}
}

// 필터링-전체
export async function getFilteredEventsWithoutPagination(
  location: string,
  category: string,
  cost: string,
  startDate: string,
  endDate: string,
  orderBy: string
): Promise<SimpleEvent[] | undefined> {
  const locationQuery = location && `location=${location}&`;
  const categoryQuery = category && `category=${category}&`;
  const costQuery = cost && `isfree=${cost}&`;
  const startDateQuery = startDate && `start=${startDate}&`;
  const endDateQuery = endDate && `end=${endDate}&`;
  const orderByQuery = orderBy && `orderBy=${orderBy}&`;

  const accessToken = getAccessToken();

  try {
    const filteredEvents = fetch(
      `${API_V2}?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        next: { revalidate: 3600 },
      }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return filteredEvents;
  } catch (e) {}
}

/**
 * Comment
 */

// 해당 이벤트 코멘트
export async function getComments(
  eventId: number
): Promise<Comment[] | undefined> {
  const accessToken = getAccessToken();

  try {
    const result = fetch(`${API_V2}/${eventId}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      next: { revalidate: 3600 },
    })
      .then((rs) => rs.json())
      .then((data) => {
        return data.comments;
      });

    return result;
  } catch {
    console.log("에러");
  }
}

// 코멘트 추가
export async function addComment(content: string, eventId: number) {
  const accessToken = localStorage.getItem("at");
  const data = { content, eventId };

  try {
    const result = fetch(`${API_COMMENT}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(data),
    }).then((rs) => {
      return rs.json();
    });

    return result;
  } catch {
    console.log("에러?");
  }
}

// 코멘트 제거
export async function deleteComment(commentId: number) {
  const accessToken = getAccessToken();

  try {
    const result = fetch(`${API_COMMENT}/${commentId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }).then((rs) => rs.json());

    return result;
  } catch {}
}

// 코멘트 수정
export async function patchComment(content: string, commentId: number) {
  const accessToken = getAccessToken();

  try {
    const result = fetch(`${API_COMMENT}/${commentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify({ content }),
    }).then((rs) => rs.json());

    return result;
  } catch {}
}

/**
 * Likes
 */
export async function toggleLikes(eventId: number) {
  const accessToken = getAccessToken();
  try {
    const result = fetch(`${API_V2}/${eventId}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }).then((rs) => rs.json());

    return result;
  } catch {}
}
