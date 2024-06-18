const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { hash } = require('bcrypt');

async function main() {
  const defaultAdmin = await prisma.user.create({
    data: {
      name: 'Admin User',
      email: 'admin@test.com',
      password: await hash('test', 10),
      user_type: 'admin',
    },
  });
  console.log('Default admin created:', defaultAdmin);
  const defaultEditor = await prisma.user.create({
    data: {
      name: 'Editor User',
      email: 'editor@test.com',
      password: await hash('test', 10),
      user_type: 'editor',
    },
  });
  console.log('Default admin created:', defaultEditor);
  const defaultUser = await prisma.user.create({
    data: {
      name: 'Test User',
      email: 'user@test.com',
      password: await hash('test', 10),
      user_type: 'user',
    },
  });
  console.log('Default admin created:', defaultUser);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });