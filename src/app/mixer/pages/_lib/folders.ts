"use server"
import { PrismaClient, Prisma } from '@prisma/client'
import { v4 as uuidv4 } from "uuid";
import { Folders } from '@/types/pagesFolder';
import { allowedAdminAccess } from '@/lib/auth';


const prisma = new PrismaClient();

export const mxrFolderAdd = async (name: string, parent: string, order: number): Promise<Folders> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const folder = await prisma.folders.create({
        data: {
            id: uuidv4(),
            name: name,
            parentId: parent,
            order: order
        },
    })
    return folder;
}

export const mxrFolderGet = async (id: string): Promise<Folders | null> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const folder = await prisma.folders.findUnique({
        where: {
            id: id
        }
    })
    return folder;
}

export const mxrFolderGetAll = async (): Promise<Folders[]> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const folders = await prisma.folders.findMany({
        where: {
            OR: [
                { parentId: null },
                { parentId: '' },
                { parentId: { contains: ' ' } },
            ],
        },
        orderBy: {
            name: 'asc'
        }
    });
    return folders;
};

export const mxrFolderGetChildren = async (id: string): Promise<Folders[]> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const folders = await prisma.folders.findMany({
        where: {
            parentId: id
        },
        orderBy: {
            name: 'asc'
        }
    })
    return folders;
}

// TODO create definitions for deletedFolders and deletedPages
export const mxrFolderDelete = async (id: string): Promise<{ deletedFolders: any, deletedPages: any }> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const deletedFolders = await prisma.folders.deleteMany({
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

export const mxrFolderDeleteSingle = async (id: string): Promise<Folders> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const folder = await prisma.folders.delete({
        where: {
            id: id
        }
    })
    return folder;
}

export const mxrFolderUpdate = async (id: string, name: string, order: number): Promise<Folders> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    console.log("mxrFolderUpdate", id, name, order)
    const folder = await prisma.folders.update({
        where: {
            id: id
        },
        data: {
            name: name,
            order: order
        }
    })
    return folder;
}