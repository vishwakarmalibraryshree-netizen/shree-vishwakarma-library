import List "mo:core/List";
import Common "../types/common";
import StudentTypes "../types/students";

module {
  public type Student = StudentTypes.Student;

  public func add(
    students : List.List<Student>,
    nextId : Nat,
    name : Text,
    mobile : Text,
    seatNumber : Common.SeatNumber,
    feesType : Common.FeesType,
    feesAmount : Nat,
    entryDate : Common.Timestamp,
    address : Text,
    fatherName : Text,
    studentId : Text,
  ) : Student {
    let nanos30Days : Int = 30 * 24 * 60 * 60 * 1_000_000_000;
    let s : Student = {
      id = nextId;
      name;
      mobile;
      seatNumber;
      feesType;
      feesAmount;
      entryDate;
      expiryDate = entryDate + nanos30Days;
      address;
      fatherName;
      isActive = true;
      studentId;
    };
    students.add(s);
    s;
  };

  public func get(students : List.List<Student>, id : Common.StudentId) : ?Student {
    students.find(func(s) { s.id == id });
  };

  public func getAll(students : List.List<Student>) : [Student] {
    students.toArray();
  };

  public func update(students : List.List<Student>, updated : Student) : Bool {
    var found = false;
    students.mapInPlace(func(s) {
      if (s.id == updated.id) {
        found := true;
        updated;
      } else {
        s;
      };
    });
    found;
  };

  public func remove(students : List.List<Student>, id : Common.StudentId) : Bool {
    let before = students.size();
    let filtered = students.filter(func(s) { s.id != id });
    students.clear();
    students.append(filtered);
    students.size() < before;
  };

  public func getExpiringSoon(students : List.List<Student>, now : Common.Timestamp) : [Student] {
    let sevenDays : Int = 7 * 24 * 60 * 60 * 1_000_000_000;
    students.filter(func(s) {
      s.isActive and s.expiryDate > now and s.expiryDate <= now + sevenDays;
    }).toArray();
  };

  public func getExpired(students : List.List<Student>, now : Common.Timestamp) : [Student] {
    students.filter(func(s) { s.expiryDate <= now }).toArray();
  };

  public func search(students : List.List<Student>, term : Text) : [Student] {
    let lower = term.toLower();
    students.filter(func(s) {
      s.name.toLower().contains(#text lower) or s.mobile.contains(#text lower);
    }).toArray();
  };
};
