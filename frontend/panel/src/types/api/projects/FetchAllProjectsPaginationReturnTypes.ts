export interface FetchAllProjectsPaginationReturnTypes {
    currentPage: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
}