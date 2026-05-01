import List "mo:core/List";
import Int "mo:core/Int";
import Time "mo:core/Time";
import Common "../types/common";
import QuoteLib "../lib/quotes";

mixin (
  quotes : List.List<QuoteLib.Quote>,
  nextQuoteId : List.List<Nat>,
) {
  public shared func addQuote(text : Text, author : Text) : async QuoteLib.Quote {
    let id = nextQuoteId.at(0);
    let q = QuoteLib.add(quotes, id, text, author);
    nextQuoteId.put(0, id + 1);
    q;
  };

  public query func getRandomQuote() : async ?QuoteLib.Quote {
    let n = quotes.size();
    let seed = if (n == 0) 0 else Int.abs(Time.now()) % n;
    QuoteLib.getRandom(quotes, seed);
  };

  public query func getAllQuotes() : async [QuoteLib.Quote] {
    QuoteLib.getAll(quotes);
  };

  public shared func deleteQuote(id : Common.QuoteId) : async Bool {
    QuoteLib.remove(quotes, id);
  };
};
