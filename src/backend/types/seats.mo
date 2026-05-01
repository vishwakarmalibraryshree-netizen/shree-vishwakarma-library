import Common "common";

module {
  public type Seat = {
    seatNumber : Common.SeatNumber;
    isOccupied : Bool;
    occupiedBy : ?Text;
  };
};
