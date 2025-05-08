// __tests__/authenticate.test.ts
import {
  login,
  googleLogin,
  signup,
  signOut,
  getUser,
} from "@/features/auth/actions/authenticate"
import { createClient } from "@/lib/auth";
import { redirect } from "next/navigation";

jest.mock("@/lib/auth", () => ({
  createClient: jest.fn(),
}));
jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
}));

describe("auth server actions", () => {
  const mockSignInWithPassword = jest.fn();
  const mockSignInWithOAuth = jest.fn();
  const mockSignUp = jest.fn();
  const mockSignOut = jest.fn();
  const mockGetUser = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockResolvedValue({
      auth: {
        signInWithPassword: mockSignInWithPassword,
        signInWithOAuth: mockSignInWithOAuth,
        signUp: mockSignUp,
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

  describe("googleLogin()", () => {
    it("redirects on success", async () => {
      mockSignInWithOAuth.mockResolvedValue({
        data: { url: "https://foo.bar" },
        error: null,
      });
      await googleLogin();
      expect(redirect).toHaveBeenCalledWith("https://foo.bar");
    });

    it("returns error message on failure", async () => {
      mockSignInWithOAuth.mockResolvedValue({
        data: null,
        error: { message: "OAuth fail" },
      });
      const res = await googleLogin();
      expect(res).toEqual({ error: "OAuth fail" });
    });
  });

  describe("signup()", () => {
    it("returns error when signUp errors", async () => {
      mockSignUp.mockResolvedValue({ error: { message: "Email taken" } });
      const fd = new FormData();
      fd.set("email", "foo@bar.com");
      fd.set("password", "pw123");
      const res = await signup(fd);
      expect(mockSignUp).toHaveBeenCalledWith({
        email: "foo@bar.com",
        password: "pw123",
      });
      expect(res).toEqual({ error: "Email taken" });
    });

    it("resolves undefined on success", async () => {
      mockSignUp.mockResolvedValue({ error: null });
      const fd = new FormData();
      fd.set("email", "new@user.com");
      fd.set("password", "goodpass");
      const res = await signup(fd);
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

  describe("getUser()", () => {
    it("returns error when getUser errors", async () => {
      mockGetUser.mockResolvedValue({
        data: null,
        error: { message: "No session" },
      });
      const res = await getUser();
      expect(res).toEqual({ error: "No session" });
    });

    it("returns data on success", async () => {
      const fakeData = { id: "123", email: "you@here.com" };
      mockGetUser.mockResolvedValue({ data: fakeData, error: null });
      const res = await getUser();
      expect(res).toEqual(fakeData);
    });
  });
});
