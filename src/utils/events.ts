import { Event, EventThumbnail } from "../types/events";
import { SimpleEvent, SimpleEventListWithPagination } from "./../types/events";

// 최신순
export async function getRecentEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const recentEvents = fetch(
      "https://web-production-d139.up.railway.app/v1/events?orderBy=latest&pageIndex=1&pageSize=10",
      {
        credentials: "include",
        next: { revalidate: 3600 },
      }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload.rows);
    return recentEvents;
  } catch (e) {}
}

//인기순
export async function getHotEvents(): Promise<EventThumbnail[] | undefined> {
  try {
    const hotEvents = fetch(
      "https://web-production-d139.up.railway.app/v1/events?orderBy=views&pageIndex=1&pageSize=7",
      {
        credentials: "include",
        next: { revalidate: 3600 },
      }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload.rows)
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
export async function getEventDetail(id: number): Promise<Event | undefined> {
  try {
    const detailEvent = fetch(
      `https://web-production-d139.up.railway.app/v1/events/${id}`,
      {
        credentials: "include",
        next: { revalidate: 3600 },
      }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return detailEvent;
  } catch (e) {}
}

// 필터링
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

  console.log(
    `https://web-production-d139.up.railway.app/v1/events?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}${pageIndexQuery}${pageSizeQuery}`
  );

  try {
    const filteredEvents = fetch(
      `https://web-production-d139.up.railway.app/v1/events?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}${pageIndexQuery}${pageSizeQuery}`,
      {
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

  try {
    const filteredEvents = fetch(
      `https://web-production-d139.up.railway.app/v1/events?${locationQuery}${categoryQuery}${costQuery}${startDateQuery}${endDateQuery}${orderByQuery}`,
      {
        credentials: "include",
        next: { revalidate: 3600 },
      }
    )
      .then((rs) => rs.json())
      .then((data) => data.payload);

    return filteredEvents;
  } catch (e) {}
}
