export type {
  Student,
  StudentId,
  Seat,
  SeatNumber,
  Notice,
  NoticeId,
  Message,
  MessageId,
  Quote,
  QuoteId,
  DailyRevenue,
  RevenueByPaymentType,
  LibrarySettings,
  Timestamp,
} from "./backend";

export { FeesType, SenderRole } from "./backend";

export interface AdminSession {
  username: string;
  loggedInAt: number;
}

export interface EnrollFormData {
  name: string;
  mobile: string;
  fatherName: string;
  address: string;
  seatNumber: string;
  feesType: "cash" | "online";
  feesAmount: string;
  entryDate: string;
  studentId: string;
}
