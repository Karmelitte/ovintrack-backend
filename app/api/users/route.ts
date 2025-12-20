import prisma from '@/lib/prisma';

// Exemple d'utilisation de Prisma dans une route API Next.js
export async function GET()
{
    try
    {
        // Récupérer tous les utilisateurs (FIND *  equivalent SQL)
        const users = await prisma.user.findMany();

        return Response.json({ users });
    }
    catch (error)
    {
        console.error('Erreur lors de la récupération des utilisateurs:', error);
        return Response.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}

export async function POST(request: Request)
{
    try
    {
        const body = await request.json();
        const { email, name } = body;

        // Créer un nouvel utilisateur
        const user = await prisma.user.create({
            data: {
                email,
                name,
            },
        });

        return Response.json({ user }, { status: 201 });
    }
    catch (error)
    {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        return Response.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
