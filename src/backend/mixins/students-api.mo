import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import StudentLib "../lib/students";
import SeatLib "../lib/seats";

mixin (
  students : List.List<StudentLib.Student>,
  nextStudentId : List.List<Nat>,
  seats : List.List<SeatLib.Seat>,
) {
  public shared func addStudent(
    name : Text,
    mobile : Text,
    seatNumber : Common.SeatNumber,
    feesType : Common.FeesType,
    feesAmount : Nat,
    entryDate : Common.Timestamp,
    address : Text,
    fatherName : Text,
    studentId : Text,
  ) : async StudentLib.Student {
    let id = nextStudentId.at(0);
    let s = StudentLib.add(
      students,
      id,
      name,
      mobile,
      seatNumber,
      feesType,
      feesAmount,
      entryDate,
      address,
      fatherName,
      studentId,
    );
    nextStudentId.put(0, id + 1);
    // Mark the seat as occupied since student is active and paid
    ignore SeatLib.updateOccupancy(seats, seatNumber, true, ?name);
    s;
  };

  public query func getStudent(id : Common.StudentId) : async ?StudentLib.Student {
    StudentLib.get(students, id);
  };

  public query func getAllStudents() : async [StudentLib.Student] {
    StudentLib.getAll(students);
  };

  public shared func updateStudent(updated : StudentLib.Student) : async Bool {
    let result = StudentLib.update(students, updated);
    if (result) {
      // Refresh seat occupancy based on updated student state
      if (updated.isActive) {
        ignore SeatLib.updateOccupancy(seats, updated.seatNumber, true, ?updated.name);
      } else {
        ignore SeatLib.updateOccupancy(seats, updated.seatNumber, false, null);
      };
    };
    result;
  };

  public shared func deleteStudent(id : Common.StudentId) : async Bool {
    // Find the student first to free their seat
    switch (StudentLib.get(students, id)) {
      case (?s) {
        let result = StudentLib.remove(students, id);
        if (result) {
          ignore SeatLib.updateOccupancy(seats, s.seatNumber, false, null);
        };
        result;
      };
      case null { false };
    };
  };

  public query func getStudentsExpiringSoon() : async [StudentLib.Student] {
    StudentLib.getExpiringSoon(students, Time.now());
  };

  public query func getExpiredStudents() : async [StudentLib.Student] {
    StudentLib.getExpired(students, Time.now());
  };

  public query func searchStudents(term : Text) : async [StudentLib.Student] {
    StudentLib.search(students, term);
  };
};
