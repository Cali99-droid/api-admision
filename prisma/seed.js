import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const range = await prisma.range.createMany({
    data: [
      {
        name: "S/ 1000 a S/ 1500",
      },
      {
        name: "S/ 1001 a S/ 2000",
      },
      {
        name: "S/ 2001 a S/ 2500",
      },
      {
        name: "S/ 2501 a S/ 3000",
      },
      {
        name: "S/ 3000 a más",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
