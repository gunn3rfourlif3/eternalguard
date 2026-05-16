import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const pool = new Pool({
  // SWAP THIS: Use the specific Instance Endpoint instead of the Cluster Endpoint
  host: 'eternalguard.cn6eqccuwehr.eu-north-1.rds.amazonaws.com', 
  port: 5432,
  user: 'postgres',
  password: 'Arsenal.fclub2027',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
  // Aurora sometimes needs a longer window to establish the first connection
  connectionTimeoutMillis: 30000, 
})

const adapter = new PrismaPg(pool)

export const prisma =
  globalForPrisma.prisma || new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma