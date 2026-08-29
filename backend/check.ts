import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
prisma.stayPackage.findFirst();
