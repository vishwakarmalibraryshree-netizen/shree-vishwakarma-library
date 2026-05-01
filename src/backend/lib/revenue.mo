import List "mo:core/List";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import StudentTypes "../types/students";
import RevenueTypes "../types/revenue";
import Common "../types/common";

module {
  func tsToDateStr(ts : Common.Timestamp) : Text {
    // ts is nanoseconds since Unix epoch
    let secs : Int = ts / 1_000_000_000;
    let days : Int = secs / 86400;
    let z = days + 719468;
    let era : Int = (if (z >= 0) z else z - 146096) / 146097;
    let doe : Int = z - era * 146097;
    let yoe : Int = (doe - doe / 1460 + doe / 36524 - doe / 146096) / 365;
    let y : Int = yoe + era * 400;
    let doy : Int = doe - (365 * yoe + yoe / 4 - yoe / 100);
    let mp : Int = (5 * doy + 2) / 153;
    let d : Int = doy - (153 * mp + 2) / 5 + 1;
    let m : Int = mp + (if (mp < 10) 3 else -9);
    let yr : Int = y + (if (m <= 2) 1 else 0);
    let pad2 = func(n : Int) : Text {
      if (n < 10) "0" # n.toText() else n.toText();
    };
    yr.toText() # "-" # pad2(m) # "-" # pad2(d);
  };

  func dateMonthYear(ts : Common.Timestamp) : (Nat, Nat) {
    let dateStr = tsToDateStr(ts);
    let parts = dateStr.split(#char '-');
    let arr = parts.toArray();
    if (arr.size() < 3) return (0, 0);
    let yr = switch (Nat.fromText(arr[0])) { case (?v) v; case null 0 };
    let mo = switch (Nat.fromText(arr[1])) { case (?v) v; case null 0 };
    (yr, mo);
  };

  public func getDaily(
    students : List.List<StudentTypes.Student>,
    date : Text,
  ) : RevenueTypes.DailyRevenue {
    var cash : Nat = 0;
    var online : Nat = 0;
    students.forEach(func(s) {
      if (tsToDateStr(s.entryDate) == date) {
        switch (s.feesType) {
          case (#cash) { cash += s.feesAmount };
          case (#online) { online += s.feesAmount };
        };
      };
    });
    { date; cashAmount = cash; onlineAmount = online; total = cash + online };
  };

  public func getMonthly(
    students : List.List<StudentTypes.Student>,
    year : Nat,
    month : Nat,
  ) : Nat {
    var total : Nat = 0;
    students.forEach(func(s) {
      let (yr, mo) = dateMonthYear(s.entryDate);
      if (yr == year and mo == month) { total += s.feesAmount };
    });
    total;
  };

  public func getTotal(students : List.List<StudentTypes.Student>) : Nat {
    var total : Nat = 0;
    students.forEach(func(s) { total += s.feesAmount });
    total;
  };

  public func getByPaymentType(students : List.List<StudentTypes.Student>) : RevenueTypes.RevenueByPaymentType {
    var cash : Nat = 0;
    var online : Nat = 0;
    students.forEach(func(s) {
      switch (s.feesType) {
        case (#cash) { cash += s.feesAmount };
        case (#online) { online += s.feesAmount };
      };
    });
    { cashTotal = cash; onlineTotal = online; grandTotal = cash + online };
  };

  public func getChart(students : List.List<StudentTypes.Student>, now : Common.Timestamp) : [RevenueTypes.DailyRevenue] {
    let dayNanos : Int = 86400 * 1_000_000_000;
    var result : [RevenueTypes.DailyRevenue] = [];
    var i = 29;
    while (i >= 0) {
      let dayTs : Int = now - (i * dayNanos);
      let dateStr = tsToDateStr(dayTs);
      var cash : Nat = 0;
      var online : Nat = 0;
      students.forEach(func(s) {
        if (tsToDateStr(s.entryDate) == dateStr) {
          switch (s.feesType) {
            case (#cash) { cash += s.feesAmount };
            case (#online) { online += s.feesAmount };
          };
        };
      });
      result := result.concat([{ date = dateStr; cashAmount = cash; onlineAmount = online; total = cash + online }]);
      i -= 1;
    };
    result;
  };
};
