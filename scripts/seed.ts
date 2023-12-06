const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.deleteMany();
    await database.category.createMany({
      data: [
        { "name": "Programming" },
        { "name": "Web Development" },
        { "name": "Electronics" },
        { "name": "Mobile App Development" },
        { "name": "Data Science and Analytics" },
        { "name": "Networking and Security" },
        { "name": "Databases" },
        { "name": "Game Development" },
        { "name": "Soft Skills" },
        { "name": "Career Development" }
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