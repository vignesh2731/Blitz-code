import prisma from ".";

async function seed()
{
    const res=await prisma.user.create({
        data:{
            email:"test@gmail.com",
            password:"test",
            name:"test"
        }
    })
    console.log("Db has been seeded");
    console.log(res);
}
seed();