import List "mo:core/List";
import Time "mo:core/Time";
import StudentLib "../lib/students";
import RevenueLib "../lib/revenue";
import RevenueTypes "../types/revenue";

mixin (
  students : List.List<StudentLib.Student>,
) {
  public query func getDailyRevenue(date : Text) : async RevenueTypes.DailyRevenue {
    RevenueLib.getDaily(students, date);
  };

  public query func getMonthlyRevenue(year : Nat, month : Nat) : async Nat {
    RevenueLib.getMonthly(students, year, month);
  };

  public query func getTotalRevenue() : async Nat {
    RevenueLib.getTotal(students);
  };

  public query func getRevenueByPaymentType() : async RevenueTypes.RevenueByPaymentType {
    RevenueLib.getByPaymentType(students);
  };

  public query func getRevenueChart() : async [RevenueTypes.DailyRevenue] {
    RevenueLib.getChart(students, Time.now());
  };
};
