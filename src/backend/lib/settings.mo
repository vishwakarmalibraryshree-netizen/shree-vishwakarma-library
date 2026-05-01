import Text "mo:core/Text";
import Char "mo:core/Char";
import Nat32 "mo:core/Nat32";
import SettingsTypes "../types/settings";

module {
  // Simple hash using Char.toNat32 for on-chain password verification
  public func hashPassword(password : Text) : Text {
    var h : Nat32 = 5381;
    for (c in password.toIter()) {
      h := ((h << 5) +% h) +% c.toNat32();
    };
    h.toText();
  };

  public func verifyAdmin(admin : SettingsTypes.AdminProfile, username : Text, password : Text) : Bool {
    admin.username == username and admin.passwordHash == hashPassword(password);
  };

  public func updateCredentials(
    admin : SettingsTypes.AdminProfile,
    newUsername : Text,
    newEmail : Text,
    newPasswordHash : Text,
  ) : SettingsTypes.AdminProfile {
    { admin with username = newUsername; email = newEmail; passwordHash = newPasswordHash };
  };

  public func defaultSettings() : SettingsTypes.LibrarySettings {
    {
      libraryName = "Shree Vishwakarma Library";
      totalSeats = 50;
      address = "";
      phone = "";
      facilities = ["WiFi", "AC", "Drinking Water", "Study Tables", "Locker", "CCTV", "Newspaper", "Printer"];
      openingHours = "6:00 AM - 10:00 PM";
    };
  };

  public func defaultAdmin() : SettingsTypes.AdminProfile {
    {
      username = "admin";
      email = "";
      passwordHash = hashPassword("library@123");
    };
  };
};
