export const websiteAddress =
  (typeof process !== "undefined" ? process.env.WEBSITE_ADDRESS : undefined) ||
  "http://localhost:3000";
