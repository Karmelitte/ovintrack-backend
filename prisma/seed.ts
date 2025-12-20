import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

const adapter = new PrismaLibSql({
    url: process.env.DATABASE_URL || '',
});

const prisma = new PrismaClient({ adapter });

async function main()
{
    console.log('🌱 Début du seeding...');

    // Nettoyer les données existantes (optionnel)
    await prisma.user.deleteMany();

    // Créer des utilisateurs de test
    const users = await prisma.user.createMany({
        data: [
            {
                email: 'alice@example.com',
                name: 'Alice Dupont',
            },
            {
                email: 'bob@example.com',
                name: 'Bob Martin',
            },
            {
                email: 'charlie@example.com',
                name: 'Charlie Durand',
            },
        ],
    });

    console.log(`✅ ${users.count} utilisateurs créés`);

    // Afficher les utilisateurs créés
    const allUsers = await prisma.user.findMany();
    console.log('\n📋 Utilisateurs dans la base de données :');
    allUsers.forEach((user) =>
    {
        console.log(`   - ${user.name} (${user.email})`);
    });

    console.log('\n✨ Seeding terminé avec succès !');
}

try
{
    await main();
}
catch (e)
{
    console.error('❌ Erreur lors du seeding:', e);
    process.exit(1);
}
finally
{
    await prisma.$disconnect();
}
