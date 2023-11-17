"use client";

import Image from "next/image";
import Link from "next/link";
import useEventDetail from "../hooks/useEventDetail";
import Button from "./Button";
import Comment from "./Comment";
import Likes from "./Likes";
import StaticMap from "./StaticMap";

type Props = {
  id: number;
};

const LIST_STYLE = "w-full flex flex-col md:flex-row md:gap-4";
const LABEL_STYLE = "min-w-[64px] p-4 bg-slate-200 font-bold";
const INFO_STYLE = "flex items-center";

const EventDetail = ({ id }: Props) => {
  const { eventDetail, mutate, isMyLikes } = useEventDetail(id);

  if (eventDetail) {
    const {
      thumbnail,
      title,
      category,
      place,
      eventPeriod,
      fee,
      homePage,
      id,
      latitude,
      isFree,
      targetAudience,
      longitude,
      Users: likesUsers,
    } = eventDetail;

    return (
      <div className="flex flex-col gap-10 p-10">
        <section className="flex flex-col md:flex-row gap-5">
          <div className="w-full md:w-2/5 rounded-xl overflow-hidden relative">
            <Image
              src={thumbnail || ""}
              alt={title || ""}
              width={700}
              height={700}
              className="object-contain w-full h-full"
            />
            <div className="absolute top-0 right-0">
              <Likes
                likesCount={likesUsers.length}
                detailMutate={mutate}
                eventId={id}
                isMyLikes={isMyLikes}
              />
            </div>
          </div>
          <div className="w-full md:w-3/5 p-2 flex flex-col gap-6">
            <h2 className="mb-6 text-xl font-semibold">{title || ""}</h2>
            <ul className="flex flex-col gap-4">
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>장르</span>
                <p className={INFO_STYLE}>{category}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>장소</span>
                <p className={INFO_STYLE}>{place}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>기간</span>
                <p className={INFO_STYLE}> {eventPeriod}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>대상</span>
                <p className={INFO_STYLE}> {targetAudience}</p>
              </li>
              <li className={LIST_STYLE}>
                <span className={LABEL_STYLE}>요금</span>
                <p className={INFO_STYLE}>
                  {fee || (isFree === true ? "무료" : "유료")}
                </p>
              </li>
            </ul>
            <Link href={homePage || "/"} target="_blank" className="w-fit">
              <Button>{`상세정보 보러가기 >`}</Button>
            </Link>
          </div>
        </section>
        <StaticMap longitude={latitude} latitude={longitude} />
        <Comment eventId={id} />
      </div>
    );
  } else {
    return <div>내용X</div>;
  }
};

export default EventDetail;
