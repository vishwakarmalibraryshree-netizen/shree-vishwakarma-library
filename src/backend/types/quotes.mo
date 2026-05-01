import Common "common";

module {
  public type Quote = {
    id : Common.QuoteId;
    quote : Text;
    author : Text;
  };
};
