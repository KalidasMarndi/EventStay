const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const pkg = await prisma.stayPackage.findFirst();
  console.log(pkg ? pkg.id : 'NO_PKG');
}
main().catch(console.error).finally(() => prisma.$disconnect());
