export type Event = {
  id: number;
  category: EventCategory;
  location: EventLocatino;
  isFree: boolean;
  title: string;
  evnetPeriod: string;
  place: string;
  hostOrganization: string;
  fee: string;
  performerInfo: string;
  programInfo: string;
  otherInfo: string;
  homPage: string;
  latitude: string;
  longitude: string;
  thumbnail: string;
  startDate: string;
  endDate: string;
  favorite: number;
  createdAt: string;
  updatedAt: string;
};

type EventCategory =
  | "강남구"
  | "강동구"
  | "강북구"
  | "강서구"
  | "관악구"
  | "광진구"
  | "구로구"
  | "금천구"
  | "노원구"
  | "도봉구"
  | "동대문구"
  | "동작구"
  | "마포구"
  | "서대문구"
  | "서초구"
  | "성동구"
  | "성북구"
  | "송파구"
  | "양천구";
type EventLocatino =
  | "콘서트"
  | "클래식"
  | "뮤지컬/오페라"
  | "연극"
  | "무용"
  | "국악"
  | "독주/독창회"
  | "전시/미술"
  | "축제-기타"
  | "축제-문화/예술"
  | "축제-자연/경관"
  | "축제-전통/역사"
  | "축제-시민화합";