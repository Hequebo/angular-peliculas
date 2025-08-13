export interface MovieFilter {
    title: string;
    genreId: number;
    nextReleases: boolean;
    inCinemas: boolean;
    page: number;
    recordsPerPage: number;
}
