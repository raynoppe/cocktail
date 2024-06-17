"use server"
import { PrismaClient, Prisma } from '@prisma/client'
import { v4 as uuidv4 } from "uuid";
import { Folders } from '@/types/pagesFolder';

const prisma = new PrismaClient();

export const mxrPageAdd = async (
    title: string,
    slug: string,
    folderId: string,
) => {
    const folder = await prisma.page.create({
        data: {
            id: uuidv4(),
            title: title,
            slug: slug,
            folderId: folderId,
        },
    })
    return folder;
}

export const mxrPageGet = async (id: string) => {
    const folder = await prisma.page.findUnique({
        where: {
            id: id
        }
    })
    return folder;
}

export const mxrPageGetAll = async (): Promise<Folders[]> => {
    const folders = await prisma.page.findMany({
        where: {
            OR: [
                { parentId: null },
                { parentId: '' },
                { parentId: { contains: ' ' } },
            ],
        },
        orderBy: {
            title: 'asc'
        }
    });
    return folders;
};

export const mxrPageGetChildren = async (id: string): Promise<Folders[]> => {
    const folders = await prisma.page.findMany({
        where: {
            parentId: id
        },
        orderBy: {
            title: 'asc'
        }
    })
    return folders;
}

export const mxrPageDelete = async (id: string) => {
    const deletedFolders = await prisma.page.deleteMany({
        where: {
            OR: [
                { id: id },
                { parentId: id },
            ],
        },
    });
    const deletedPages = await prisma.page.deleteMany({
        where: {
            folderId: id,
        },
    });
    return { deletedFolders, deletedPages };
}

export const mxrPageDeleteSingle = async (id: string) => {
    const folder = await prisma.page.delete({
        where: {
            id: id
        }
    })
    return folder;
}

export const mxrPageUpdate = async (id: string, title: string, order: number) => {
    console.log("mxrPageUpdate", id, title, order)
    const folder = await prisma.page.update({
        where: {
            id: id
        },
        data: {
            title: title,
            order: order
        }
    })
    return folder;
}