import Common "common";

module {
  public type Message = {
    id : Common.MessageId;
    senderId : Text;
    senderName : Text;
    senderRole : Common.SenderRole;
    recipientId : Text;
    content : Text;
    timestamp : Common.Timestamp;
    isRead : Bool;
  };
};
