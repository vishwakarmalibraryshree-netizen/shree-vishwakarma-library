module {
  public type DailyRevenue = {
    date : Text;
    total : Nat;
    cashAmount : Nat;
    onlineAmount : Nat;
  };

  public type RevenueByPaymentType = {
    cashTotal : Nat;
    onlineTotal : Nat;
    grandTotal : Nat;
  };
};
