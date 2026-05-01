import Common "common";

module {
  public type Notice = {
    id : Common.NoticeId;
    title : Text;
    content : Text;
    createdAt : Common.Timestamp;
    isActive : Bool;
  };
};
