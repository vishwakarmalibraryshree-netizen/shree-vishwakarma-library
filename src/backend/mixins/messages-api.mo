import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import MessageLib "../lib/messages";
import StudentLib "../lib/students";

mixin (
  messages : List.List<MessageLib.Message>,
  nextMessageId : List.List<Nat>,
  students : List.List<StudentLib.Student>,
) {
  public shared func sendMessage(
    senderId : Text,
    senderName : Text,
    senderRole : Common.SenderRole,
    recipientId : Text,
    content : Text,
  ) : async MessageLib.Message {
    let id = nextMessageId.at(0);
    let m = MessageLib.send(
      messages,
      id,
      senderId,
      senderName,
      senderRole,
      recipientId,
      content,
      Time.now(),
    );
    nextMessageId.put(0, id + 1);
    m;
  };

  public shared func sendBroadcast(content : Text) : async Nat {
    let now = Time.now();
    var count = 0;
    let activeStudents = students.filter(func(s) { s.isActive });
    activeStudents.forEach(func(s) {
      let id = nextMessageId.at(0);
      ignore MessageLib.send(
        messages,
        id,
        "admin",
        "Admin",
        #admin,
        s.studentId,
        content,
        now,
      );
      nextMessageId.put(0, id + 1);
      count += 1;
    });
    count;
  };

  public query func getMessagesForStudent(studentId : Text) : async [MessageLib.Message] {
    MessageLib.getForStudent(messages, studentId);
  };

  public query func getAllMessages() : async [MessageLib.Message] {
    MessageLib.getAll(messages);
  };

  public shared func markMessageRead(id : Common.MessageId) : async Bool {
    MessageLib.markRead(messages, id);
  };

  public query func getUnreadCount(recipientId : Text) : async Nat {
    MessageLib.unreadCount(messages, recipientId);
  };
};
