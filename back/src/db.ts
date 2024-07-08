import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoClient } from 'mongodb';

const mongod = new MongoMemoryServer({
	instance: {
		port: 27017,
	},
});

async function startMongoMemoryServer() {
	try {
		await mongod.start();
		const uri = mongod.getUri();
		const client = new MongoClient(uri);
		await client.connect();
		console.log(`Serveur MongoDB démarré avec l'URI : ${uri}`);
		return client;
	} catch (error) {
		console.error('Failed to start MongoMemoryServer', error);
		throw error;
	}
}

const client = await startMongoMemoryServer();
export { client };