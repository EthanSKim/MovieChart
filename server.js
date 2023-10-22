import { ApolloServer, gql } from "apollo-server";
import API_KEY from "./src/apiKey.js";
import fetch from "node-fetch";

const typeDefs = gql `
    type Movie {
        adult: Boolean!
        backdrop_path: String!
        genre_ids: [Int!]!
        id: Int!
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
    type Query {
        allMovies: [Movie!]!
        movie(id:String!): Movie!
    }
`;

const resolvers = {
    Query: {
        allMovies() {
            return fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`).then(r => r.json()).then(json => json.results);
        },
        movie(_, {id}) {
            return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        }
    }
}


const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}) => {
    console.log(`Running on ${url}`);
});