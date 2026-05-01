import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  LibrarySettings,
  Notice,
  Quote,
  SenderRole,
  Student,
} from "../types";

// ── Students ──────────────────────────────────────────────────────────────────
export function useAllStudents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Student[]>({
    queryKey: ["students"],
    queryFn: async () => (actor ? actor.getAllStudents() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useStudent(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Student | null>({
    queryKey: ["student", id?.toString()],
    queryFn: async () => (actor && id != null ? actor.getStudent(id) : null),
    enabled: !!actor && !isFetching && id != null,
  });
}

export function useStudentsExpiringSoon() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Student[]>({
    queryKey: ["students-expiring"],
    queryFn: async () => (actor ? actor.getStudentsExpiringSoon() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useSearchStudents(term: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Student[]>({
    queryKey: ["students-search", term],
    queryFn: async () => (actor && term ? actor.searchStudents(term) : []),
    enabled: !!actor && !isFetching && term.length > 1,
  });
}

export function useAddStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      name: string;
      mobile: string;
      seatNumber: bigint;
      feesType: "cash" | "online";
      feesAmount: bigint;
      entryDate: bigint;
      address: string;
      fatherName: string;
      studentId: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const { FeesType } = await import("../types");
      return actor.addStudent(
        data.name,
        data.mobile,
        data.seatNumber,
        data.feesType === "cash" ? FeesType.cash : FeesType.online,
        data.feesAmount,
        data.entryDate,
        data.address,
        data.fatherName,
        data.studentId,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["seats-available"] });
    },
  });
}

export function useUpdateStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (student: Student) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStudent(student);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useDeleteStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteStudent(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["seats-available"] });
    },
  });
}

// ── Seats ─────────────────────────────────────────────────────────────────────
export function useAvailableSeats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["seats-available"],
    queryFn: async () => (actor ? actor.getAvailableSeats() : []),
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useOccupiedSeats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["seats-occupied"],
    queryFn: async () => (actor ? actor.getOccupiedSeats() : []),
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useUpdateSeatOccupancy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      seatNumber,
      isOccupied,
      occupiedBy,
    }: {
      seatNumber: bigint;
      isOccupied: boolean;
      occupiedBy: string | null;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateSeatOccupancy(seatNumber, isOccupied, occupiedBy);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seats-available"] });
      qc.invalidateQueries({ queryKey: ["seats-occupied"] });
    },
  });
}

export function useInitializeSeats() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (total: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.initializeSeats(total);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seats-available"] });
      qc.invalidateQueries({ queryKey: ["seats-occupied"] });
    },
  });
}

// ── Notices ───────────────────────────────────────────────────────────────────
export function useActiveNotices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Notice[]>({
    queryKey: ["notices-active"],
    queryFn: async () => (actor ? actor.getActiveNotices() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useAddNotice() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content,
    }: { title: string; content: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addNotice(title, content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices-active"] }),
  });
}

export function useUpdateNotice() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (notice: Notice) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateNotice(notice);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices-active"] }),
  });
}

export function useDeleteNotice() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteNotice(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices-active"] }),
  });
}

// ── Revenue ───────────────────────────────────────────────────────────────────
export function useTotalRevenue() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: ["revenue-total"],
    queryFn: async () => (actor ? actor.getTotalRevenue() : BigInt(0)),
    enabled: !!actor && !isFetching,
  });
}

export function useRevenueByPaymentType() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["revenue-by-type"],
    queryFn: async () =>
      actor
        ? actor.getRevenueByPaymentType()
        : {
            cashTotal: BigInt(0),
            onlineTotal: BigInt(0),
            grandTotal: BigInt(0),
          },
    enabled: !!actor && !isFetching,
  });
}

export function useRevenueChart() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["revenue-chart"],
    queryFn: async () => (actor ? actor.getRevenueChart() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useMonthlyRevenue(year: number, month: number) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<bigint>({
    queryKey: ["revenue-monthly", year, month],
    queryFn: async () =>
      actor ? actor.getMonthlyRevenue(BigInt(year), BigInt(month)) : BigInt(0),
    enabled: !!actor && !isFetching,
  });
}

// ── Quotes ────────────────────────────────────────────────────────────────────
export function useRandomQuote() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Quote | null>({
    queryKey: ["quote-random"],
    queryFn: async () => (actor ? actor.getRandomQuote() : null),
    enabled: !!actor && !isFetching,
    refetchInterval: 60_000,
  });
}

export function useAllQuotes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Quote[]>({
    queryKey: ["quotes-all"],
    queryFn: async () => (actor ? actor.getAllQuotes() : []),
    enabled: !!actor && !isFetching,
  });
}

export function useAddQuote() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ text, author }: { text: string; author: string }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addQuote(text, author);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quotes-all"] }),
  });
}

export function useDeleteQuote() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteQuote(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quotes-all"] }),
  });
}

// ── Messages ──────────────────────────────────────────────────────────────────
export function useAllMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["messages-all"],
    queryFn: async () => (actor ? actor.getAllMessages() : []),
    enabled: !!actor && !isFetching,
    refetchInterval: 15_000,
  });
}

export function useMessagesForStudent(studentId: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["messages-student", studentId],
    queryFn: async () =>
      actor && studentId ? actor.getMessagesForStudent(studentId) : [],
    enabled: !!actor && !isFetching && !!studentId,
    refetchInterval: 15_000,
  });
}

export function useSendMessage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      senderId: string;
      senderName: string;
      role: SenderRole;
      recipientId: string;
      content: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.sendMessage(
        data.senderId,
        data.senderName,
        data.role,
        data.recipientId,
        data.content,
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages-all"] }),
  });
}

export function useMarkMessageRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.markMessageRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages-all"] }),
  });
}

// ── Settings ──────────────────────────────────────────────────────────────────
export function useSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<LibrarySettings>({
    queryKey: ["settings"],
    queryFn: async () =>
      actor
        ? actor.getSettings()
        : {
            libraryName: "Shree Vishwakarma Library",
            address: "",
            phone: "",
            openingHours: "",
            facilities: [],
            totalSeats: BigInt(0),
          },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings: LibrarySettings) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateSettings(settings);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] }),
  });
}
