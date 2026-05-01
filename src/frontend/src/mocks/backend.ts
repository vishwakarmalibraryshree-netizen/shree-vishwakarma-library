import type { backendInterface } from "../backend";
import { FeesType, SenderRole } from "../backend";

const now = BigInt(Date.now()) * BigInt(1_000_000);
const thirtyDays = BigInt(30 * 24 * 60 * 60 * 1_000_000_000);

const sampleStudents = [
  {
    id: BigInt(1),
    studentId: "STU001",
    name: "Rahul Sharma",
    mobile: "9876543210",
    fatherName: "Rajesh Sharma",
    address: "12, Shivaji Nagar, Pune",
    seatNumber: BigInt(5),
    feesType: FeesType.cash,
    feesAmount: BigInt(500),
    entryDate: now - thirtyDays,
    expiryDate: now + thirtyDays,
    isActive: true,
  },
  {
    id: BigInt(2),
    studentId: "STU002",
    name: "Priya Patel",
    mobile: "9123456789",
    fatherName: "Suresh Patel",
    address: "45, Gandhi Road, Ahmedabad",
    seatNumber: BigInt(12),
    feesType: FeesType.online,
    feesAmount: BigInt(500),
    entryDate: now - BigInt(15 * 24 * 60 * 60 * 1_000_000_000),
    expiryDate: now + BigInt(15 * 24 * 60 * 60 * 1_000_000_000),
    isActive: true,
  },
];

const sampleSeats = Array.from({ length: 50 }, (_, i) => ({
  seatNumber: BigInt(i + 1),
  isOccupied: i < 12,
  occupiedBy: i < 12 ? `Student ${i + 1}` : undefined,
}));

const sampleNotices = [
  {
    id: BigInt(1),
    title: "Library Timing Change",
    content: "Library will now remain open from 6 AM to 10 PM on all days including Sundays.",
    createdAt: now,
    isActive: true,
  },
  {
    id: BigInt(2),
    title: "Fees Due Reminder",
    content: "Students whose membership expires this month, please renew at the earliest.",
    createdAt: now - BigInt(2 * 24 * 60 * 60 * 1_000_000_000),
    isActive: true,
  },
];

const sampleQuotes = [
  {
    id: BigInt(1),
    quote: "Padhai ka koi shortcut nahi hota, mehnat hi safalta ki kunji hai.",
    author: "Dr. A.P.J. Abdul Kalam",
  },
  {
    id: BigInt(2),
    quote: "Sapne woh nahi jo neend mein aate hain, sapne woh hain jo neend na aane den.",
    author: "Dr. A.P.J. Abdul Kalam",
  },
];

const sampleMessages = [
  {
    id: BigInt(1),
    senderId: "STU001",
    senderName: "Rahul Sharma",
    senderRole: SenderRole.student,
    recipientId: "admin",
    content: "Sir, kya main seat number change kar sakta hoon?",
    timestamp: now,
    isRead: false,
  },
];

export const mockBackend: backendInterface = {
  addNotice: async (title, content) => ({
    id: BigInt(3),
    title,
    content,
    createdAt: now,
    isActive: true,
  }),
  addQuote: async (text, author) => ({
    id: BigInt(3),
    quote: text,
    author,
  }),
  addStudent: async (name, mobile, seatNumber, feesType, feesAmount, entryDate, address, fatherName, studentId) => ({
    id: BigInt(3),
    studentId,
    name,
    mobile,
    fatherName,
    address,
    seatNumber,
    feesType,
    feesAmount,
    entryDate,
    expiryDate: entryDate + thirtyDays,
    isActive: true,
  }),
  deleteNotice: async () => true,
  deleteQuote: async () => true,
  deleteStudent: async () => true,
  getActiveNotices: async () => sampleNotices,
  getAllMessages: async () => sampleMessages,
  getAllQuotes: async () => sampleQuotes,
  getAllSeats: async () => sampleSeats,
  getAllStudents: async () => sampleStudents,
  getAvailableSeats: async () => sampleSeats.filter((s) => !s.isOccupied),
  getDailyRevenue: async (date) => ({
    date,
    total: BigInt(1500),
    cashAmount: BigInt(1000),
    onlineAmount: BigInt(500),
  }),
  getExpiredStudents: async () => [],
  getMessagesForStudent: async () => sampleMessages,
  getMonthlyRevenue: async () => BigInt(15000),
  getOccupiedSeats: async () => sampleSeats.filter((s) => s.isOccupied),
  getRandomQuote: async () => sampleQuotes[0],
  getRevenueByPaymentType: async () => ({
    cashTotal: BigInt(10000),
    onlineTotal: BigInt(5000),
    grandTotal: BigInt(15000),
  }),
  getRevenueChart: async () => [
    { date: "2026-04-28", total: BigInt(1000), cashAmount: BigInt(600), onlineAmount: BigInt(400) },
    { date: "2026-04-29", total: BigInt(1500), cashAmount: BigInt(1000), onlineAmount: BigInt(500) },
    { date: "2026-04-30", total: BigInt(2000), cashAmount: BigInt(1200), onlineAmount: BigInt(800) },
    { date: "2026-05-01", total: BigInt(500), cashAmount: BigInt(500), onlineAmount: BigInt(0) },
  ],
  getSeatStatus: async () => sampleSeats[0],
  getSettings: async () => ({
    libraryName: "Shree Vishwakarma Library",
    address: "123, Vishwakarma Nagar, Pune - 411001",
    phone: "+91 98765 43210",
    openingHours: "6:00 AM – 10:00 PM",
    totalSeats: BigInt(50),
    facilities: ["WiFi", "AC Hall", "Purified Water", "CCTV Security", "Newspaper & Magazines", "Locker Facility"],
  }),
  getStudent: async () => sampleStudents[0],
  getStudentsExpiringSoon: async () => [sampleStudents[1]],
  getTotalRevenue: async () => BigInt(75000),
  getUnreadCount: async () => BigInt(1),
  initializeSeats: async () => undefined,
  markMessageRead: async () => true,
  searchStudents: async () => sampleStudents,
  sendMessage: async (senderId, senderName, senderRole, recipientId, content) => ({
    id: BigInt(2),
    senderId,
    senderName,
    senderRole,
    recipientId,
    content,
    timestamp: now,
    isRead: false,
  }),
  updateAdminCredentials: async () => true,
  updateNotice: async () => true,
  updateSeatOccupancy: async () => true,
  updateSettings: async () => undefined,
  updateStudent: async () => true,
  verifyAdmin: async () => true,
  sendBroadcast: async () => BigInt(1),
};
