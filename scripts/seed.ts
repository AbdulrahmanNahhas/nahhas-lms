const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.deleteMany();
    await database.category.createMany({
      data: [
        { name: "Programming" },
        { name: "Web Development" },
        { name: "Data Science" },
        { name: "Mobile App Development" },
        { name: "Artificial Intelligence" },
        { name: "Cybersecurity" },
        { name: "Game Development" },
        { name: "Graphic Design" },
        { name: "Digital Marketing" },
        { name: "Robotics" },
        { name: "Business & Entrepreneurship" },
        { name: "Photography" },
        { name: "Health & Fitness" },
        { name: "Languages" },
        { name: "Music & Audio Production" },
        { name: "Other..." }
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