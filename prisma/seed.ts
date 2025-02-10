import { PrismaClient } from '@prisma/client';

const db = new PrismaClient()

async function main() {
  // Delete existing data (optional)
  await db.deviceModel.deleteMany();
  await db.deviceBrand.deleteMany();

  // Preload data
  const brands = [
    {
      name: 'iPhone',
      models: [
        { name: 'iPhone 16 Pro Max', basePrice: 8000},
        { name: 'iPhone 16 Pro', basePrice: 8000},
        { name: 'iPhone 16 Plus', basePrice: 8000},
        { name: 'iPhone 16', basePrice: 8000},
        { name: 'iPhone 15 Pro Max', basePrice: 7000},
        { name: 'iPhone 15 Pro', basePrice: 7000},
        { name: 'iPhone 15 Plus', basePrice: 7000},
        { name: 'iPhone 15', basePrice: 7000},
        { name: 'iPhone 14 Pro Max', basePrice: 6000},
        { name: 'iPhone 14 Pro', basePrice: 6000},
        { name: 'iPhone 14 Plus', basePrice: 6000},
        { name: 'iPhone 14', basePrice: 6000},
        { name: 'iPhone 13 Pro Max', basePrice: 5500},
        { name: 'iPhone 13 Pro', basePrice: 5500},
        { name: 'iPhone 13 Mini', basePrice: 5500},
        { name: 'iPhone 13', basePrice: 5500},
        { name: 'iPhone 12 Pro Max', basePrice: 2500},
        { name: 'iPhone 12 Pro', basePrice: 2500},
        { name: 'iPhone 12 Mini', basePrice: 2500},
        { name: 'iPhone 12', basePrice: 2500},
        { name: 'iPhone 11 Pro Max', basePrice: 2000},
        { name: 'iPhone 11 Pro', basePrice: 2000},
        { name: 'iPhone 11', basePrice: 2000},
        { name: 'iPhone XS Max', basePrice: 2000},
        { name: 'iPhone XS', basePrice: 2000},
        { name: 'iPhone XR', basePrice: 2000},
        { name: 'iPhone X', basePrice: 2000},
      ],
    },
    {
      name: 'Samsung',
      models: [
        { name: 'Galaxy S25 Ultra', basePrice: 7000},
        { name: 'Galaxy S25+', basePrice: 7000},
        { name: 'Galaxy S25', basePrice: 7000},
        { name: 'Galaxy S24 Ultra', basePrice: 6000},
        { name: 'Galaxy S24+', basePrice: 6000},
        { name: 'Galaxy S24', basePrice: 6000},
        { name: 'Galaxy S23 Ultra', basePrice: 4000},
        { name: 'Galaxy S23+', basePrice: 4000},
        { name: 'Galaxy S23', basePrice: 4000},
        { name: 'Galaxy S22 Ultra', basePrice: 3500},
        { name: 'Galaxy S22+', basePrice: 3500},
        { name: 'Galaxy S22', basePrice: 3500},
        { name: 'Galaxy S21 Ultra', basePrice: 2500},
        { name: 'Galaxy S21+', basePrice: 2500},
        { name: 'Galaxy S21', basePrice: 2500},
        { name: 'Galaxy S20 Ultra', basePrice: 2000},
        { name: 'Galaxy S20+', basePrice: 2000},
        { name: 'Galaxy S20', basePrice: 2000},
        { name: 'Galaxy S10+', basePrice: 2000},
        { name: 'Galaxy S10', basePrice: 2000},
        { name: 'Galaxy S9', basePrice: 2000},
        { name: 'Galaxy Z Flip', basePrice: 10000},
        { name: 'Galaxy Z Fold', basePrice: 10000},
        { name: 'Galaxy A54', basePrice: 2000},
      ],
    },
  ];
  

  for (const brandData of brands) {
    await db.deviceBrand.create({
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
    await db.$disconnect();
  });
