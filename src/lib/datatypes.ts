export interface ResponseType<T> {
	dates: {
		maximum: string;
		minimum: string;
	};
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface GenreType {
	id: number;
	name: string;
}

export interface PersonListType {
	credit_id: string;
	gender: number;
	id: number;
	name: string;
	original_name: string;
	profile_path: string;
}

export interface MovieListType {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: number;
	vote_average: number;
	vote_count: number;
}
export interface MovieType {
	adult: boolean;
	backdrop_path: string;
	belongs_to_collection: {
		backdrop_path: string;
		id: boolean;
		name: string;
		poster_path: string;
	};
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string;
	id: number;
	imdb_id: string;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	};
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	};
	status?: string;
	tagline: string;
	title: string;
	video: number;
	vote_average: number;
	vote_count: number;
}

export interface TVSeriesListType {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: number;
	vote_average: number;
	vote_count: number;
}
export interface TVSeriesType {
	adult: boolean;
	backdrop_path: string;
	created_by: PersonListType[];
	episode_run_time: number[];
	first_air_date: string;
	genres: GenreType[];
	homepage: string;
	id: number;
	in_production: number;
	languages: string[];
	last_air_date: string;
	last_episode_to_air: EpisodeListType;
	name: string;
	networks: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	next_episode_to_air: EpisodeListType;
	number_of_episodes: number;
	number_of_seasons: number;
	origin_country: string[];
	original_language: string;
	original_name: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: {
		id: number;
		logo_path: string;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	};
	seasons: SeasonListType[];
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	};
	status: string;
	tagline: string;
	type: string;
	vote_average: number;
	vote_count: number;
}
export interface SeasonListType {
	air_date: string;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
}
export interface SeasonType {
	air_date: string;
	episodes: EpisodeListType[];
	id: number;
	name: string;
	overview: string;
	poster_path: string;
	season_number: number;
	vote_average: number;
	_id: string;
}
export interface EpisodeListType {
	air_date: string;
	episode_number: number;
	episode_type: string;
	id: number;
	name: string;
	overview: string;
	production_code: string;
	runtime: number;
	season_number: number;
	show_id: number;
	still_path: string;
	vote_average: number;
	vote_count: number;
}
export interface EpisodeType {
	air_date: string;
	crew: any[];
	episode_number: number;
	guest_stars: any[];
	id: number;
	name: string;
	overview: string;
	production_code: string;
	runtime: number;
	season_number: number;
	still_path: string;
	vote_average: number;
	vote_count: number;
}
