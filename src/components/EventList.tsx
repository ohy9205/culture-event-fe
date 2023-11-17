"use  client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SimpleEventListWithPagination } from "../types/events";
import { getFilteredEvents } from "../utils/events";
import EventCard from "./EventCard";
import { Filter } from "./FilteredEventList";
import GridContainer from "./GridContainer";
import Pagination from "./Pagination";

type Props = {
  filter: Filter;
};

const PAGE_PER_SIZE = 16;

const EventList = ({ filter }: Props) => {
  const [events, setEvents] = useState<SimpleEventListWithPagination>({
    events: [],
    totalPage: 0,
  });
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pagingGroupIndex: 0,
  });

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0, pagingGroupIndex: 0 }));
    const fetchingData = async () => {
      const data = await fetchData(filter, 0);
      if (data) {
        setEvents(data);
      }
    };
    fetchingData();
  }, [filter]);

  useEffect(() => {
    const fetchingData = async () => {
      const data = await fetchData(filter, pagination.pageIndex);
      if (data) {
        setEvents(data);
      }
    };
    fetchingData();
  }, [pagination]);

  return (
    <div className="w-full flex flex-col gap-5">
      <GridContainer>
        {events.events.map((event) => (
          <EventCard key={event.id} id={event.id}>
            <div className="flex flex-col rounded-lg overflow-hidden h-[470px] shadow-md">
              <Image
                src={event.thumbnail}
                alt={`${event.title} ${event.id} 포스터`}
                width={500}
                height={500}
                className="w-full h-[370px] object-cover"
              />
              <div className="flex flex-col p-5">
                <h2 className="truncate font-bold mb-4">{event.title}</h2>
                <h3 className="text-small">{event.eventPeriod}</h3>
              </div>
            </div>
          </EventCard>
        ))}
      </GridContainer>
      <Pagination
        pagePerSize={PAGE_PER_SIZE}
        pagination={pagination}
        setPagination={setPagination}
        totalPage={events.totalPage || 0}
      />
    </div>
  );
};

export default EventList;

const fetchData = async (filter: Filter, pageIndex: number) => {
  const { location, category, cost, startDate, endDate, orderBy } = filter;
  const data = await getFilteredEvents(
    location,
    category,
    cost,
    startDate,
    endDate,
    orderBy,
    pageIndex,
    PAGE_PER_SIZE
  );

  return data;
};
