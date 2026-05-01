import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LibrarySettings {
    totalSeats: bigint;
    address: string;
    openingHours: string;
    facilities: Array<string>;
    libraryName: string;
    phone: string;
}
export type Timestamp = bigint;
export interface Seat {
    occupiedBy?: string;
    isOccupied: boolean;
    seatNumber: SeatNumber;
}
export type StudentId = bigint;
export interface DailyRevenue {
    total: bigint;
    date: string;
    onlineAmount: bigint;
    cashAmount: bigint;
}
export type QuoteId = bigint;
export type SeatNumber = bigint;
export type MessageId = bigint;
export interface Notice {
    id: NoticeId;
    title: string;
    content: string;
    createdAt: Timestamp;
    isActive: boolean;
}
export interface Message {
    id: MessageId;
    content: string;
    isRead: boolean;
    timestamp: Timestamp;
    senderName: string;
    senderRole: SenderRole;
    recipientId: string;
    senderId: string;
}
export interface RevenueByPaymentType {
    cashTotal: bigint;
    grandTotal: bigint;
    onlineTotal: bigint;
}
export interface Quote {
    id: QuoteId;
    quote: string;
    author: string;
}
export type NoticeId = bigint;
export interface Student {
    id: StudentId;
    feesType: FeesType;
    entryDate: Timestamp;
    studentId: string;
    feesAmount: bigint;
    expiryDate: Timestamp;
    name: string;
    isActive: boolean;
    fatherName: string;
    address: string;
    mobile: string;
    seatNumber: SeatNumber;
}
export enum FeesType {
    cash = "cash",
    online = "online"
}
export enum SenderRole {
    admin = "admin",
    student = "student"
}
export interface backendInterface {
    addNotice(title: string, content: string): Promise<Notice>;
    addQuote(text: string, author: string): Promise<Quote>;
    addStudent(name: string, mobile: string, seatNumber: SeatNumber, feesType: FeesType, feesAmount: bigint, entryDate: Timestamp, address: string, fatherName: string, studentId: string): Promise<Student>;
    deleteNotice(id: NoticeId): Promise<boolean>;
    deleteQuote(id: QuoteId): Promise<boolean>;
    deleteStudent(id: StudentId): Promise<boolean>;
    getActiveNotices(): Promise<Array<Notice>>;
    getAllMessages(): Promise<Array<Message>>;
    getAllQuotes(): Promise<Array<Quote>>;
    getAllSeats(): Promise<Array<Seat>>;
    getAllStudents(): Promise<Array<Student>>;
    getAvailableSeats(): Promise<Array<Seat>>;
    getDailyRevenue(date: string): Promise<DailyRevenue>;
    getExpiredStudents(): Promise<Array<Student>>;
    getMessagesForStudent(studentId: string): Promise<Array<Message>>;
    getMonthlyRevenue(year: bigint, month: bigint): Promise<bigint>;
    getOccupiedSeats(): Promise<Array<Seat>>;
    getRandomQuote(): Promise<Quote | null>;
    getRevenueByPaymentType(): Promise<RevenueByPaymentType>;
    getRevenueChart(): Promise<Array<DailyRevenue>>;
    getSeatStatus(seatNumber: SeatNumber): Promise<Seat | null>;
    getSettings(): Promise<LibrarySettings>;
    getStudent(id: StudentId): Promise<Student | null>;
    getStudentsExpiringSoon(): Promise<Array<Student>>;
    getTotalRevenue(): Promise<bigint>;
    getUnreadCount(recipientId: string): Promise<bigint>;
    initializeSeats(totalSeats: bigint): Promise<void>;
    markMessageRead(id: MessageId): Promise<boolean>;
    searchStudents(term: string): Promise<Array<Student>>;
    sendBroadcast(content: string): Promise<bigint>;
    sendMessage(senderId: string, senderName: string, senderRole: SenderRole, recipientId: string, content: string): Promise<Message>;
    updateAdminCredentials(currentPassword: string, newUsername: string, newEmail: string, newPassword: string): Promise<boolean>;
    updateNotice(updated: Notice): Promise<boolean>;
    updateSeatOccupancy(seatNumber: SeatNumber, isOccupied: boolean, occupiedBy: string | null): Promise<boolean>;
    updateSettings(updated: LibrarySettings): Promise<void>;
    updateStudent(updated: Student): Promise<boolean>;
    verifyAdmin(username: string, password: string): Promise<boolean>;
}
