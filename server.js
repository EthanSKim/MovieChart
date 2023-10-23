import { ApolloServer, gql } from "apollo-server";
import API_KEY from "./src/apiKey.js";
import fetch from "node-fetch";

const typeDefs = gql `
    type Movie {
        adult: Boolean!
        backdrop_path: String!
        genre_ids: [Int!]!
        id: String!
        original_language: String!
        original_title: String!
        overview: String!
        popularity: Float!
        poster_path: String!
        release_date: String!
        title: String!
        video: Boolean!
        vote_average: Float!
        vote_count: Int!
    }
    type Details {
        adult: Boolean!
        backdrop_path: String!
        budget: Int!
        genres: [Genre!]!
        homepage: String!
        id: Int!
        imdb_id: String!
        original_language: String!
        original_title: String!
        overview: String!
        popularity: Float!
        poster_path: String!
        release_date: String!
        revenue: Int!
        runtime: Int!
        status: String!
        tagline: String!
        title: String!
        video: Boolean!
        vote_average: Float!
        vote_count: Int!
        trailer: VideoList!
    }
    type VideoList {
        id: Int!
        results: [Video!]!
    }
    type Video {
        iso_639_1: String!
        iso_3166_1: String!
        name: String!
        key: String!
        site: String!
        size: Int!
        type: String!
        official: Boolean!
        published_at: String!
        id: String!
    }
    type Genre {
        id: Int!
        name: String!
    }
    type Query {
        allMovies: [Movie!]!
        movie(id:Int!): Details!
    }
`;

const resolvers = {
    Query: {
        allMovies() {
            return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`).then(r => r.json()).then(json => json.results);
        },
        movie(_, {id}) {
            return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`).then(r => r.json());
        }
    },
    Details: {
        trailer({id}) {
            return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`).then(r => r.json());
        }
    }
}


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});