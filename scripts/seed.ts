const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.deleteMany();
    await database.category.createMany({
      data: [
        { name: "Computer Science" },
        { name: "Fitness" },
        { name: "Design" },
        { name: "Accounting" },
        { name: "Engineering" },
        { name: "Filming" }
      ]
    })

    console.log("success");
  }
  catch (error) {
    console.log("Error seeding the database categories", error);
  } finally {
    await database.$disconnect();
  }
}

main()