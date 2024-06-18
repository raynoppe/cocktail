"use server"
import { PrismaClient } from '@prisma/client'
import { v4 as uuidv4 } from "uuid";
import { Folders, Page } from '@/types/pagesFolder';
import { allowedAdminAccess } from '@/lib/auth';

const prisma = new PrismaClient();

export const mxrPageAdd = async (
    title: string,
    slug: string,
    folderId: string,
    authorId: string
): Promise<Page> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const page = await prisma.page.create({
        data: {
            title,
            slug,
            content: '',
            folderId,
            authorId,
            status: 'draft',
        },
    })
    return page;
}

export const mxrPageGet = async (id: string): Promise<Page | null> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const page = await prisma.page.findUnique({
        where: {
            id: id
        }
    })
    return page;
}

export const mxrPageGetAll = async (): Promise<Page[]> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const folders = await prisma.page.findMany({
        where: {
            OR: [
                { folderId: '' },
                { folderId: { contains: ' ' } },
            ],
        },
        orderBy: {
            title: 'asc'
        }
    });
    return folders;
};

export const mxrPageGetByFolderId = async (folderId: string): Promise<Page[]> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    if (!folderId || folderId === '') {
        throw new Error('Folder ID is required');
    }
    const pages = await prisma.page.findMany({
        where: {
            folderId
        },
        orderBy: {
            title: 'asc'
        }
    });
    return pages;
};


export const mxrPageDeleteSingle = async (id: string): Promise<Page> => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const folder = await prisma.page.delete({
        where: {
            id: id
        }
    })
    return folder;
}

export const mxrPageUpdate = async (
    id: string,
    title: string,
    slug: string
) => {
    if (!allowedAdminAccess()) {
        throw new Error('Access Denied');
    }
    const page = await prisma.page.update({
        where: {
            id: id
        },
        data: {
            title,
            slug
        }
    })
    return page;
}