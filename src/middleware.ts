export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/trip"],
  // matcher: ["/((?!register|api|login).*)"],
};
