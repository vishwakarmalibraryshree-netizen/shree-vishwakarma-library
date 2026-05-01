import Common "common";

module {
  public type Student = {
    id : Common.StudentId;
    name : Text;
    mobile : Text;
    seatNumber : Common.SeatNumber;
    feesType : Common.FeesType;
    feesAmount : Nat;
    entryDate : Common.Timestamp;
    expiryDate : Common.Timestamp;
    address : Text;
    fatherName : Text;
    isActive : Bool;
    studentId : Text;
  };
};
