export interface IPaginateRespose<T> {
    paginatedResults: T[]
    totalCount: number,
    nextPage?: number
}