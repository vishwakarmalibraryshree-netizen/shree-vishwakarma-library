import { s as useActor, t as useQuery, i as useQueryClient, v as useMutation, _ as __vitePreload, w as createActor, F as FeesType, S as SenderRole } from "./index-BxMJF1mf.js";
function useAllStudents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => actor ? actor.getAllStudents() : [],
    enabled: !!actor && !isFetching
  });
}
function useStudentsExpiringSoon() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["students-expiring"],
    queryFn: async () => actor ? actor.getStudentsExpiringSoon() : [],
    enabled: !!actor && !isFetching
  });
}
function useAddStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      const { FeesType: FeesType2 } = await __vitePreload(async () => {
        const { FeesType: FeesType3 } = await Promise.resolve().then(() => types);
        return { FeesType: FeesType3 };
      }, true ? void 0 : void 0);
      return actor.addStudent(
        data.name,
        data.mobile,
        data.seatNumber,
        data.feesType === "cash" ? FeesType2.cash : FeesType2.online,
        data.feesAmount,
        data.entryDate,
        data.address,
        data.fatherName,
        data.studentId
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["seats-available"] });
    }
  });
}
function useUpdateStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (student) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateStudent(student);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] })
  });
}
function useDeleteStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteStudent(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["seats-available"] });
    }
  });
}
function useAvailableSeats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["seats-available"],
    queryFn: async () => actor ? actor.getAvailableSeats() : [],
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useOccupiedSeats() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["seats-occupied"],
    queryFn: async () => actor ? actor.getOccupiedSeats() : [],
    enabled: !!actor && !isFetching,
    refetchInterval: 3e4
  });
}
function useUpdateSeatOccupancy() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      seatNumber,
      isOccupied,
      occupiedBy
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateSeatOccupancy(seatNumber, isOccupied, occupiedBy);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seats-available"] });
      qc.invalidateQueries({ queryKey: ["seats-occupied"] });
    }
  });
}
function useInitializeSeats() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (total) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.initializeSeats(total);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seats-available"] });
      qc.invalidateQueries({ queryKey: ["seats-occupied"] });
    }
  });
}
function useActiveNotices() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["notices-active"],
    queryFn: async () => actor ? actor.getActiveNotices() : [],
    enabled: !!actor && !isFetching
  });
}
function useAddNotice() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      title,
      content
    }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addNotice(title, content);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices-active"] })
  });
}
function useUpdateNotice() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (notice) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateNotice(notice);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices-active"] })
  });
}
function useDeleteNotice() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteNotice(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["notices-active"] })
  });
}
function useTotalRevenue() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["revenue-total"],
    queryFn: async () => actor ? actor.getTotalRevenue() : BigInt(0),
    enabled: !!actor && !isFetching
  });
}
function useRevenueByPaymentType() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["revenue-by-type"],
    queryFn: async () => actor ? actor.getRevenueByPaymentType() : {
      cashTotal: BigInt(0),
      onlineTotal: BigInt(0),
      grandTotal: BigInt(0)
    },
    enabled: !!actor && !isFetching
  });
}
function useRevenueChart() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["revenue-chart"],
    queryFn: async () => actor ? actor.getRevenueChart() : [],
    enabled: !!actor && !isFetching
  });
}
function useMonthlyRevenue(year, month) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["revenue-monthly", year, month],
    queryFn: async () => actor ? actor.getMonthlyRevenue(BigInt(year), BigInt(month)) : BigInt(0),
    enabled: !!actor && !isFetching
  });
}
function useRandomQuote() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["quote-random"],
    queryFn: async () => actor ? actor.getRandomQuote() : null,
    enabled: !!actor && !isFetching,
    refetchInterval: 6e4
  });
}
function useAllQuotes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["quotes-all"],
    queryFn: async () => actor ? actor.getAllQuotes() : [],
    enabled: !!actor && !isFetching
  });
}
function useAddQuote() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ text, author }) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.addQuote(text, author);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quotes-all"] })
  });
}
function useDeleteQuote() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteQuote(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["quotes-all"] })
  });
}
function useAllMessages() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["messages-all"],
    queryFn: async () => actor ? actor.getAllMessages() : [],
    enabled: !!actor && !isFetching,
    refetchInterval: 15e3
  });
}
function useSendMessage() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.sendMessage(
        data.senderId,
        data.senderName,
        data.role,
        data.recipientId,
        data.content
      );
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages-all"] })
  });
}
function useMarkMessageRead() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.markMessageRead(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["messages-all"] })
  });
}
function useSettings() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["settings"],
    queryFn: async () => actor ? actor.getSettings() : {
      libraryName: "Shree Vishwakarma Library",
      address: "",
      phone: "",
      openingHours: "",
      facilities: [],
      totalSeats: BigInt(0)
    },
    enabled: !!actor && !isFetching
  });
}
function useUpdateSettings() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (settings) => {
      if (!actor) throw new Error("Actor not ready");
      return actor.updateSettings(settings);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["settings"] })
  });
}
const types = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  FeesType,
  SenderRole
}, Symbol.toStringTag, { value: "Module" }));
export {
  useOccupiedSeats as a,
  useActiveNotices as b,
  useAddNotice as c,
  useUpdateNotice as d,
  useDeleteNotice as e,
  useAllStudents as f,
  useDeleteStudent as g,
  useUpdateStudent as h,
  useStudentsExpiringSoon as i,
  useMonthlyRevenue as j,
  useAllMessages as k,
  useSendMessage as l,
  useMarkMessageRead as m,
  useSettings as n,
  useUpdateSettings as o,
  useInitializeSeats as p,
  useAllQuotes as q,
  useAddQuote as r,
  useDeleteQuote as s,
  useRandomQuote as t,
  useAvailableSeats as u,
  useAddStudent as v,
  useUpdateSeatOccupancy as w,
  useTotalRevenue as x,
  useRevenueByPaymentType as y,
  useRevenueChart as z
};
