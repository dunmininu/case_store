import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Delete existing data (optional)
  await prisma.deviceModel.deleteMany();
  await prisma.deviceBrand.deleteMany();

  // Preload data
  const brands = [
    {
      name: 'iPhone',
      models: [
        { name: 'iPhone 16 Pro Max' },
        { name: 'iPhone 16 Pro' },
        { name: 'iPhone 16 Plus' },
        { name: 'iPhone 16' },
        { name: 'iPhone 15 Pro Max' },
        { name: 'iPhone 15 Pro' },
        { name: 'iPhone 15 Plus' },
        { name: 'iPhone 15' },
        { name: 'iPhone 14 Pro Max' },
        { name: 'iPhone 14 Pro' },
        { name: 'iPhone 14 Plus' },
        { name: 'iPhone 14' },
        { name: 'iPhone 13 Pro Max' },
        { name: 'iPhone 13 Pro' },
        { name: 'iPhone 13 Mini' },
        { name: 'iPhone 13' },
        { name: 'iPhone 12 Pro Max' },
        { name: 'iPhone 12 Pro' },
        { name: 'iPhone 12 Mini' },
        { name: 'iPhone 12' },
        { name: 'iPhone 11 Pro Max' },
        { name: 'iPhone 11 Pro' },
        { name: 'iPhone 11' },
        { name: 'iPhone XS Max' },
        { name: 'iPhone XS' },
        { name: 'iPhone XR' },
        { name: 'iPhone X' },
      ],
    },
    {
      name: 'Samsung',
      models: [
        { name: 'Galaxy S25 Ultra' },
        { name: 'Galaxy S25+' },
        { name: 'Galaxy S25' },
        { name: 'Galaxy S24 Ultra' },
        { name: 'Galaxy S24+' },
        { name: 'Galaxy S24' },
        { name: 'Galaxy S23 Ultra' },
        { name: 'Galaxy S23+' },
        { name: 'Galaxy S23' },
        { name: 'Galaxy S22 Ultra' },
        { name: 'Galaxy S22+' },
        { name: 'Galaxy S22' },
        { name: 'Galaxy S21 Ultra' },
        { name: 'Galaxy S21+' },
        { name: 'Galaxy S21' },
        { name: 'Galaxy S20 Ultra' },
        { name: 'Galaxy S20+' },
        { name: 'Galaxy S20' },
        { name: 'Galaxy S10+' },
        { name: 'Galaxy S10' },
        { name: 'Galaxy S9' },
        { name: 'Galaxy Z Flip' },
        { name: 'Galaxy Z Fold' },
        { name: 'Galaxy A54' },
      ],
    },
  ];
  

  for (const brandData of brands) {
    await prisma.deviceBrand.create({
      data: {
        name: brandData.name,
        models: {
          create: brandData.models,
        },
      },
    });
  }

  console.log('Device brands and models have been seeded.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
