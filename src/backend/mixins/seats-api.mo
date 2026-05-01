import List "mo:core/List";
import Common "../types/common";
import SeatLib "../lib/seats";

mixin (
  seats : List.List<SeatLib.Seat>,
) {
  public shared func initializeSeats(totalSeats : Nat) : async () {
    SeatLib.initialize(seats, totalSeats);
  };

  public query func getSeatStatus(seatNumber : Common.SeatNumber) : async ?SeatLib.Seat {
    SeatLib.getStatus(seats, seatNumber);
  };

  public query func getAllSeats() : async [SeatLib.Seat] {
    seats.toArray();
  };

  public shared func updateSeatOccupancy(
    seatNumber : Common.SeatNumber,
    isOccupied : Bool,
    occupiedBy : ?Text,
  ) : async Bool {
    SeatLib.updateOccupancy(seats, seatNumber, isOccupied, occupiedBy);
  };

  public query func getAvailableSeats() : async [SeatLib.Seat] {
    SeatLib.getAvailable(seats);
  };

  public query func getOccupiedSeats() : async [SeatLib.Seat] {
    SeatLib.getOccupied(seats);
  };
};
