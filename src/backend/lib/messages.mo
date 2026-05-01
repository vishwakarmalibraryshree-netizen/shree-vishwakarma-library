import List "mo:core/List";
import Common "../types/common";
import MessageTypes "../types/messages";

module {
  public type Message = MessageTypes.Message;

  public func send(
    messages : List.List<Message>,
    nextId : Nat,
    senderId : Text,
    senderName : Text,
    senderRole : Common.SenderRole,
    recipientId : Text,
    content : Text,
    timestamp : Common.Timestamp,
  ) : Message {
    let m : Message = {
      id = nextId;
      senderId;
      senderName;
      senderRole;
      recipientId;
      content;
      timestamp;
      isRead = false;
    };
    messages.add(m);
    m;
  };

  public func getForStudent(messages : List.List<Message>, studentId : Text) : [Message] {
    messages.filter(func(m) {
      m.senderId == studentId or m.recipientId == studentId;
    }).toArray();
  };

  public func getAll(messages : List.List<Message>) : [Message] {
    messages.toArray();
  };

  public func markRead(messages : List.List<Message>, id : Common.MessageId) : Bool {
    var found = false;
    messages.mapInPlace(func(m) {
      if (m.id == id) {
        found := true;
        { m with isRead = true };
      } else {
        m;
      };
    });
    found;
  };

  public func unreadCount(messages : List.List<Message>, recipientId : Text) : Nat {
    messages.filter(func(m) {
      m.recipientId == recipientId and not m.isRead;
    }).size();
  };
};
