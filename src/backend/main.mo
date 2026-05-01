import List "mo:core/List";
import SettingsLib "lib/settings";
import StudentLib "lib/students";
import SeatLib "lib/seats";
import MessageLib "lib/messages";
import NoticeLib "lib/notices";
import QuoteLib "lib/quotes";
import SettingsTypes "types/settings";
import StudentsApi "mixins/students-api";
import SeatsApi "mixins/seats-api";
import MessagesApi "mixins/messages-api";
import NoticesApi "mixins/notices-api";
import RevenueApi "mixins/revenue-api";
import SettingsApi "mixins/settings-api";
import QuotesApi "mixins/quotes-api";

actor {
  // Student state
  let students = List.empty<StudentLib.Student>();
  let nextStudentId = List.singleton<Nat>(1);

  // Seat state
  let seats = List.empty<SeatLib.Seat>();

  // Message state
  let messages = List.empty<MessageLib.Message>();
  let nextMessageId = List.singleton<Nat>(1);

  // Notice state
  let notices = List.empty<NoticeLib.Notice>();
  let nextNoticeId = List.singleton<Nat>(1);

  // Quote state
  let quotes = List.empty<QuoteLib.Quote>();
  let nextQuoteId = List.singleton<Nat>(1);

  // Settings & admin state
  let settings = List.singleton<SettingsTypes.LibrarySettings>(SettingsLib.defaultSettings());
  let admin = List.singleton<SettingsTypes.AdminProfile>(SettingsLib.defaultAdmin());

  // Seed default data on first init only (guarded by size checks)
  do {
    // Initialize 50 seats only if not already done
    if (seats.size() == 0) {
      SeatLib.initialize(seats, 50);
    };
    // Seed 10 motivational quotes only if not already done
    if (quotes.size() == 0) {
      let nextId = QuoteLib.seedDefaults(quotes, nextQuoteId.at(0));
      nextQuoteId.put(0, nextId);
    };
  };

  // Mixins — seats shared between students-api and seats-api for auto-occupancy sync
  include StudentsApi(students, nextStudentId, seats);
  include SeatsApi(seats);
  include MessagesApi(messages, nextMessageId, students);
  include NoticesApi(notices, nextNoticeId);
  include RevenueApi(students);
  include SettingsApi(settings, admin);
  include QuotesApi(quotes, nextQuoteId);
};
