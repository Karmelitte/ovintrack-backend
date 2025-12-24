import prisma from '@/lib/prisma';

export async function GET()
{
    try
    {
        // Récupérer tous les utilisateurs (FIND *  equivalent SQL)
        const sheeps = await prisma.sheep.findMany();

        return Response.json({ sheeps });
    }
    catch (error)
    {
        console.error('Erreur lors de la récupération des moutons:', error);
        return Response.json({ error: 'Erreur serveur' }, { status: 500 });
    }
}
