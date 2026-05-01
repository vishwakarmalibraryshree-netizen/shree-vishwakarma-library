import List "mo:core/List";
import Common "../types/common";
import SeatTypes "../types/seats";

module {
  public type Seat = SeatTypes.Seat;

  public func initialize(seats : List.List<Seat>, totalSeats : Nat) {
    seats.clear();
    var i = 1;
    while (i <= totalSeats) {
      seats.add({ seatNumber = i; isOccupied = false; occupiedBy = null });
      i += 1;
    };
  };

  public func getStatus(seats : List.List<Seat>, seatNumber : Common.SeatNumber) : ?Seat {
    seats.find(func(s) { s.seatNumber == seatNumber });
  };

  public func updateOccupancy(
    seats : List.List<Seat>,
    seatNumber : Common.SeatNumber,
    isOccupied : Bool,
    occupiedBy : ?Text,
  ) : Bool {
    var found = false;
    seats.mapInPlace(func(s) {
      if (s.seatNumber == seatNumber) {
        found := true;
        { s with isOccupied; occupiedBy };
      } else {
        s;
      };
    });
    found;
  };

  public func getAvailable(seats : List.List<Seat>) : [Seat] {
    seats.filter(func(s) { not s.isOccupied }).toArray();
  };

  public func getOccupied(seats : List.List<Seat>) : [Seat] {
    seats.filter(func(s) { s.isOccupied }).toArray();
  };
};
