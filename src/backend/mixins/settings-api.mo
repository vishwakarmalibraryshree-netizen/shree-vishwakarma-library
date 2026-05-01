import List "mo:core/List";
import SettingsLib "../lib/settings";
import SettingsTypes "../types/settings";

mixin (
  settings : List.List<SettingsTypes.LibrarySettings>,
  admin : List.List<SettingsTypes.AdminProfile>,
) {
  public query func getSettings() : async SettingsTypes.LibrarySettings {
    settings.at(0);
  };

  public shared func updateSettings(updated : SettingsTypes.LibrarySettings) : async () {
    settings.put(0, updated);
  };

  public shared func verifyAdmin(username : Text, password : Text) : async Bool {
    SettingsLib.verifyAdmin(admin.at(0), username, password);
  };

  public shared func updateAdminCredentials(
    currentPassword : Text,
    newUsername : Text,
    newEmail : Text,
    newPassword : Text,
  ) : async Bool {
    let a = admin.at(0);
    if (not SettingsLib.verifyAdmin(a, a.username, currentPassword)) {
      return false;
    };
    admin.put(0, SettingsLib.updateCredentials(
      a,
      newUsername,
      newEmail,
      SettingsLib.hashPassword(newPassword),
    ));
    true;
  };
};
