import { PrismaClient } from "@prisma/client";

// Creating prisma client
const prisma = new PrismaClient();

// Getting userTask Table
const prismaDB = prisma.userTask;

export default prismaDB;
