const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
   try {
      const user = await prisma.user.create({
         data: {
            name: "John Doe",
            email: "example@example.com",
            password: "password123",
         },
      });
      console.log("User created:", user);

      const recipe = await prisma.recipe.create({
         data: {
            title: "Delicious Cake",
            description: "A yummy cake recipe",
            ingredients: "flour, sugar, eggs",
            appliance: "oven",
            ustensils: "whisk, bowl",
            time: 45,
            servings: 8,
            image: "cake.jpg",
            userId: user.id,
         },
      });
      console.log("Recipe created:", recipe);

      const comment = await prisma.comment.create({
         data: {
            content: "This cake looks amazing!",
            recipeId: recipe.id,
            userId: user.id,
         },
      });
      console.log("Comment created:", comment);

      const recipes = await prisma.recipe.findMany({
         include: {
            user: true,
            comments: {
               include: {
                  user: true,
               },
            },
         },
      });
      console.log("All recipes:", recipes);
   } catch (e) {
      console.error(e);
   } finally {
      await prisma.$disconnect();
   }
}

main();
