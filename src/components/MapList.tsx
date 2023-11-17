"use  client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SimpleEvent } from "../types/events";
import { getFilteredEventsWithoutPagination } from "../utils/events";
import Button from "./Button";
import EventCard from "./EventCard";
import { Filter } from "./FilteredEventList";
import StaticMap from "./StaticMap";

type Props = {
  filter: Filter;
};

const MapList = ({ filter }: Props) => {
  const [events, setEvents] = useState<SimpleEvent[]>([]);
  const [curEvent, setCurEvent] = useState<SimpleEvent>();

  // 필터변경시
  useEffect(() => {
    const fetchingData = async () => {
      const { location, category, cost, startDate, endDate, orderBy } = filter;
      const data = await getFilteredEventsWithoutPagination(
        location,
        category,
        cost,
        startDate,
        endDate,
        orderBy
      );
      if (data) {
        setEvents(data);
        setCurEvent(data[0]);
      }
    };
    fetchingData();
  }, [filter]);

  return (
    <div className="w-full flex">
      <div className="flex flex-col gap-4 w-1/3 h-[500px] overflow-scroll py-2 px-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex justify-between shadow-md"
            onClick={() => setCurEvent(event)}
          >
            <Image
              src={event.thumbnail}
              alt={`${event.title} 포스터`}
              width={500}
              height={500}
              className="w-1/4 h-[150px] object-cover"
            />
            <div className="w-2/4 py-4">
              <h2 className="truncate font-bold mb-4">{event.title}</h2>
              <h3 className="text-sm">{event.eventPeriod}</h3>
            </div>

            <EventCard id={event.id}>
              <Button size="sm">{`상세정보`}</Button>
            </EventCard>
          </div>
        ))}
      </div>
      <div className="w-2/3">
        <StaticMap
          latitude={curEvent?.longitude || ""}
          longitude={curEvent?.latitude || ""}
        />
      </div>
    </div>
  );
};

export default MapList;
