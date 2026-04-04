import { siteConfig } from "@/config/site";

// Mock User Type for Placeholder
export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  credits: number;
}

/**
 * SaaS Core Auth Interface
 * -----------------------
 * When siteConfig.features.enableAuth is false, returns null (Anonymous).
 * When true, you can plug in BetterAuth, NextAuth, or Clerk here.
 */
export async function getSessionUser(): Promise<User | null> {
  if (!siteConfig.features.enableAuth) {
    return null;
  }

  // Placeholder for real Auth logic (e.g., BetterAuth session check)
  return {
    id: "user_mock_123",
    name: "Demo User",
    email: "demo@example.com",
    credits: 100,
  };
}

export function isUserAuthenticated(user: User | null): boolean {
  return !!user;
}
