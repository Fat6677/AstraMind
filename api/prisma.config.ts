import { defineConfig } from "@prisma/config";

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error("DATABASE_URL is missing.");
}

export default defineConfig({
  engine: "classic",
  datasource: {
    url
  }
});
