import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:EternalGuard2026@eternalguard.cn6eqccuwehr.eu-north-1.rds.amazonaws.com:5432/postgres?sslmode=require",
  },
});