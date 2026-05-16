import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: "postgresql://postgres:Arsenal.fclub2027@eternalguard.cn6eqccuwehr.eu-north-1.rds.amazonaws.com:5432/postgres?sslmode=require",
  },
});