export interface Movie {
    id?: string;
    title: string;
    synopsis: string;
    gender: string;
    main_cast: string[];
    release_year: number
    banner: string;
    where_to_watch: string[];
    rating: number;
    content_type: string;
    duration: number;
    director: string;
}

export interface TvShow {
    id?: string;
    title: string;
    synopsis: string;
    gender: string;
    main_cast: string[];
    release_year: number
    banner: string;
    where_to_watch: string[];
    rating: number;
    content_type: string;
    num_seasons: number;
    num_episodes: number;
    creator: string;
}
