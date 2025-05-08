// __tests__/authenticate.test.ts
import { login, signOut } from "@/features/auth/actions/authenticate";
import { createClient } from "@/lib/auth";

jest.mock("@/lib/auth", () => ({
  createClient: jest.fn(),
}));

describe("auth server actions", () => {
  const mockSignInWithPassword = jest.fn();
  const mockSignOut = jest.fn();
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signOut: mockSignOut,
        getUser: mockGetUser,
      },
    });
  });

  describe("login()", () => {
    it("returns error when signInWithPassword errors", async () => {
      mockSignInWithPassword.mockResolvedValue({
        error: { message: "Bad creds" },
      });
      const fd = new FormData();
      fd.set("email", "a@b.com");
      fd.set("password", "pw");
      const res = await login(fd);
      expect(mockSignInWithPassword).toHaveBeenCalledWith({
        email: "a@b.com",
        password: "pw",
      });
      expect(res).toEqual({ error: "Bad creds" });
    });

    it("resolves to undefined on success", async () => {
      mockSignInWithPassword.mockResolvedValue({ error: null });
      const fd = new FormData();
      fd.set("email", "x@y.com");
      fd.set("password", "secret");
      const res = await login(fd);
      expect(res).toBeUndefined();
    });
  });

  describe("signOut()", () => {
    it("returns error when signOut errors", async () => {
      mockSignOut.mockResolvedValue({ error: { message: "Sign out failed" } });
      const res = await signOut();
      expect(res).toEqual({ error: "Sign out failed" });
    });

    it("resolves undefined on success", async () => {
      mockSignOut.mockResolvedValue({ error: null });
      const res = await signOut();
      expect(res).toBeUndefined();
    });
  });
});
