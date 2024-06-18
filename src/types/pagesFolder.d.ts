export interface Page {
    id: string;
    title: string;
    slug: string;
    content?: string;
    folderId?: string | null;
    authorId: string;
    author?: User;
    status?: string;
    createdAt?: Date;
    updatedAt?: Date;
    PageContent?: PageContent[];
}

export interface PageContent {
    id?: string;
    pageId: string;
    parentId?: string;
    content: string;
    contentType: string;
    className: string;
    style: string;
    order: number;
    createdAt: Date;
    updatedAt: Date;
    page: Page;
}

export interface Folders {
    id: string;
    name: string;
    parentId?: string | null;
    order: number;
    createdAt: Date;
    updatedAt: Date;
}