export enum SearchType {
  all = "",
  movie = "movie",
  series = "series",
  episode = "episode",
}

export interface SearchResult {
  Title: string;
  Year: string;
  Poster: string;
  imdbID: string;
  Type: string;
}

export interface SearchError {
  Response: string;
  Error: string;
}

export interface DetailsResults {
  Genre: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  imdbRating: string;
  Director: string;
  Actors: string;
  Website: string;
}

export const useAPI = () => {
  const url = "https://www.omdbapi.com/?";
  const apiKey = "";

  const searchData = async (
    title: string,
    type: SearchType
  ): Promise<SearchResult[] | SearchError> => {
    const result = await fetch(
      //"${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}"
      url + "&s=" + encodeURI(title) + "&type=" + type + "&apikey=" + apiKey
    );
    return result.json();
  };
  const getDetails = async (id: string): Promise<DetailsResults> => {
    const result = await fetch(
      url + "&i=" + id + "&plot=full&apikey=" + apiKey
    );
    return result.json();
  };

  return {
    searchData,
    getDetails,
  };
};

export default useAPI;
