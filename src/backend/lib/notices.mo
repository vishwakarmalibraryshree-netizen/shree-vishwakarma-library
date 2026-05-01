import List "mo:core/List";
import Common "../types/common";
import NoticeTypes "../types/notices";

module {
  public type Notice = NoticeTypes.Notice;

  public func add(
    notices : List.List<Notice>,
    nextId : Nat,
    title : Text,
    content : Text,
    createdAt : Common.Timestamp,
  ) : Notice {
    let n : Notice = {
      id = nextId;
      title;
      content;
      createdAt;
      isActive = true;
    };
    notices.add(n);
    n;
  };

  public func getActive(notices : List.List<Notice>) : [Notice] {
    notices.filter(func(n) { n.isActive }).toArray();
  };

  public func update(notices : List.List<Notice>, updated : Notice) : Bool {
    var found = false;
    notices.mapInPlace(func(n) {
      if (n.id == updated.id) {
        found := true;
        updated;
      } else {
        n;
      };
    });
    found;
  };

  public func remove(notices : List.List<Notice>, id : Common.NoticeId) : Bool {
    var found = false;
    notices.mapInPlace(func(n) {
      if (n.id == id) {
        found := true;
        { n with isActive = false };
      } else {
        n;
      };
    });
    found;
  };
};
