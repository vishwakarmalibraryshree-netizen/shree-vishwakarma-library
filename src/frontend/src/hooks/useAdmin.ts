import { createActor } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";

export function useVerifyAdmin() {
  const { actor } = useActor(createActor);
  const { login } = useAuth();

  return useMutation({
    mutationFn: async ({
      username,
      password,
    }: { username: string; password: string }) => {
      if (!actor) throw new Error("Actor not ready");
      const ok = await actor.verifyAdmin(username, password);
      if (!ok) throw new Error("Invalid username or password");
      return username;
    },
    onSuccess: (username) => {
      login(username);
    },
  });
}

export function useUpdateAdminCredentials() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      currentPassword,
      newUsername,
      newEmail,
      newPassword,
    }: {
      currentPassword: string;
      newUsername: string;
      newEmail: string;
      newPassword: string;
    }) => {
      if (!actor) throw new Error("Actor not ready");
      const ok = await actor.updateAdminCredentials(
        currentPassword,
        newUsername,
        newEmail,
        newPassword,
      );
      if (!ok)
        throw new Error("Credentials update failed — check current password");
      return ok;
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });
}
