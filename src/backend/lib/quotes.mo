import List "mo:core/List";
import Common "../types/common";
import QuoteTypes "../types/quotes";

module {
  public type Quote = QuoteTypes.Quote;

  public func add(
    quotes : List.List<Quote>,
    nextId : Nat,
    text : Text,
    author : Text,
  ) : Quote {
    let q : Quote = { id = nextId; quote = text; author };
    quotes.add(q);
    q;
  };

  public func getRandom(quotes : List.List<Quote>, seed : Nat) : ?Quote {
    let n = quotes.size();
    if (n == 0) return null;
    ?(quotes.at(seed % n));
  };

  public func getAll(quotes : List.List<Quote>) : [Quote] {
    quotes.toArray();
  };

  public func remove(quotes : List.List<Quote>, id : Common.QuoteId) : Bool {
    let before = quotes.size();
    let filtered = quotes.filter(func(q) { q.id != id });
    quotes.clear();
    quotes.append(filtered);
    quotes.size() < before;
  };

  public func seedDefaults(quotes : List.List<Quote>, nextId : Nat) : Nat {
    let defaults : [(Text, Text)] = [
      ("An investment in knowledge pays the best interest.", "Benjamin Franklin"),
      ("The more that you read, the more things you will know.", "Dr. Seuss"),
      ("Success is not final, failure is not fatal: it is the courage to continue that counts.", "Winston Churchill"),
      ("Education is the most powerful weapon which you can use to change the world.", "Nelson Mandela"),
      ("The beautiful thing about learning is that no one can take it away from you.", "B.B. King"),
      ("Live as if you were to die tomorrow. Learn as if you were to live forever.", "Mahatma Gandhi"),
      ("In the middle of every difficulty lies opportunity.", "Albert Einstein"),
      ("It does not matter how slowly you go as long as you do not stop.", "Confucius"),
      ("The secret of getting ahead is getting started.", "Mark Twain"),
      ("Believe you can and you are halfway there.", "Theodore Roosevelt"),
    ];
    var id = nextId;
    for ((text, author) in defaults.vals()) {
      quotes.add({ id; quote = text; author });
      id += 1;
    };
    id;
  };
};
