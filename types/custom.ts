export type AdminUser = {
    username: string,
    password: string
}

export interface Pagination {
    orderBy: string;
    page: number;
    perPage: number;
}