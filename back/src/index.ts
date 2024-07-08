import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { client } from "./db.ts";
import type {
	Movie,
	Realisator,
	Resolvers,
	Saga
} from "../../graphql/src/resolvers.ts";
import { typeDefs } from "../../graphql/src/schema.ts";

const movies = client.db('movievore').collection<Movie>('movies');
const realisators = client.db('movievore').collection<Realisator>('realisators');
const sagas = client.db('movievore').collection<Saga>('sagas');


const resolvers: Resolvers = {
	Query: {
		movies: async () => await movies.find({}).toArray(),
		realisators: async () => await realisators.find({}).toArray(),
		sagas: async () => await sagas.find({}).toArray(),
	},
	Mutation: {
		addSaga: async (_, {title, description, movies}) => {
			const newSagas = {title, description, movies};
			await sagas.insertOne(newSagas);
			return newSagas;
		},
		modifySaga: async (_, {findTitle, title, description, movies}) => {
			return await sagas.findOneAndUpdate(
				{title: findTitle},
				{$set: {title, description, movies}},
				{returnDocument: 'after'}
			);
		},
		deleteSaga: async (_, {title}) => {
			const result = await sagas.deleteOne({title});
			return result.deletedCount === 1;
		},
		addMovie: async (_, {title, realisators, year, genre}) => {
			const newMovie = {title, realisators, year, genre};
			await movies.insertOne(newMovie);
			return newMovie;
		},
		modifyMovie: async (_, {findTitle, title, realisators, year, genre}) => {
			return await movies.findOneAndUpdate(
				{title: findTitle},
				{$set: {title, realisators, year, genre}},
				{returnDocument: 'after'}
			);
		},
		deleteMovie: async (_, {title}) => {
			const result = await movies.deleteOne({title});
			return result.deletedCount === 1;
		},
		addRealisator: async (_, {firstname, lastname, birthdate}) => {
			const newRealisator = {firstname, lastname, birthdate};
			await realisators.insertOne(newRealisator);
			return newRealisator;
		},
		modifyRealisator: async (_, {
			firstname,
			lastname,
			birthdate,
			newFirstname,
			newLastname,
			newBirthdate
		}) => {
			return await realisators.findOneAndUpdate(
				{firstname, lastname, birthdate},
				{
					$set: {
						firstname: newFirstname,
						lastname: newLastname,
						birthdate: newBirthdate
					}
				},
				{returnDocument: 'after'}
			);
		},
		deleteRealisator: async (_, {firstname, lastname}) => {
			const result = await realisators.deleteOne({firstname, lastname});
			return result.deletedCount === 1;
		},
	},
}
const server = new ApolloServer({
	typeDefs,
	resolvers,
});
const {url} = await startStandaloneServer(server, {
	listen: {port: 4000},
});

console.log(`🚀  Server ready at: ${url}`);
