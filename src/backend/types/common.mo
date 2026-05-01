module {
  public type Timestamp = Int;
  public type StudentId = Nat;
  public type SeatNumber = Nat;
  public type MessageId = Nat;
  public type NoticeId = Nat;
  public type QuoteId = Nat;

  public type FeesType = { #cash; #online };
  public type SenderRole = { #admin; #student };
};
