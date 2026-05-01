module {
  public type LibrarySettings = {
    libraryName : Text;
    totalSeats : Nat;
    address : Text;
    phone : Text;
    facilities : [Text];
    openingHours : Text;
  };

  public type AdminProfile = {
    username : Text;
    email : Text;
    passwordHash : Text;
  };
};
