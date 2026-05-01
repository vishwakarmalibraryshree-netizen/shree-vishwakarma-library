import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import NoticeLib "../lib/notices";

mixin (
  notices : List.List<NoticeLib.Notice>,
  nextNoticeId : List.List<Nat>,
) {
  public shared func addNotice(title : Text, content : Text) : async NoticeLib.Notice {
    let id = nextNoticeId.at(0);
    let n = NoticeLib.add(notices, id, title, content, Time.now());
    nextNoticeId.put(0, id + 1);
    n;
  };

  public query func getActiveNotices() : async [NoticeLib.Notice] {
    NoticeLib.getActive(notices);
  };

  public shared func updateNotice(updated : NoticeLib.Notice) : async Bool {
    NoticeLib.update(notices, updated);
  };

  public shared func deleteNotice(id : Common.NoticeId) : async Bool {
    NoticeLib.remove(notices, id);
  };
};
