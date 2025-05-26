import { Client, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6824a37b0024b3b50c27')
    .setJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjA4NzY4MDAsImlzcyI6Imh0dHBzOi8vY2xvdWQuYXBwd3JpdGUuaW8vdjEiLCJpYXQiOjE3MjA4NzY4MDAsIm5iZiI6MTcyMDg3NjgwMCwic3ViIjoic3RhbmRhcmRfODJlNzhiMDM0NTg0MjJmZTg3YzUwMmQxNTY5NmViZWE1ZGYwNDYwOWQwOTBmMjZjMGE2Y2I4NmQ4YTVmZjAzYTE2OGNmOTk1ZGJhMjk0NTQwMGNlZTY4YTBkYjNmYWFiNzkxZmM3N2Q0NjNlN2Y3MGQyY2M2NjQyOWQ2ZWUyM2ZlZjQyYjJhOTFhOTY1OWY5ZDljYjA0MWMwZTIyYWNkZmMyNzljNWRmZDhkYTVjN2QxYjg2MTI3NTNiMDVkZjVlMjFiYWQyZjQ0N2EwMWQ0MGVlM2QyZjEzMjI5MzAxYTQyM2ZjOTdlOWVlNjc4ZjQyNGUyNzdhYWNlYzU1ZDEyMyJ9.standard_82e78b03458422fe87c502d15696ebea5df04609d090f26c0a6cb86d8a5ff03a168cf995dba2945400cee68a0db3faab791fc77d463e7f70d2cc66429d6ee23fef42b2a91a9659f9d9cb041c0e22acdfc279c5dfd8da5c7d1b8612753b05df5e21bad2f447a01d40ee3d2f13229301a423fc97e9ee678f424e277aacec55d123');

const databases = new Databases(client);

const DATABASE_ID = '6824a3f4000b44d4a2cc';
const READINGS_COLLECTION_ID = '6824b220001571fa0ac7';

async function testDatabase() {
    try {
        console.log('Attempting to fetch documents...');
        const response = await databases.listDocuments(
            DATABASE_ID,
            READINGS_COLLECTION_ID
        );
        console.log('Documents found:', response.documents.length);
        
        if (response.documents.length > 0) {
            console.log('Available documents:');
            response.documents.forEach((doc, index) => {
                console.log(`\nDocument ${index + 1}:`);
                console.log('ID:', doc.$id);
                console.log('Created at:', new Date(doc.$createdAt).toLocaleString());
                console.log('pH:', doc.ph);
                console.log('Temperature:', doc.temperature);
                console.log('Turbidity:', doc.turbidity);
                console.log('TDS:', doc.tds);
            });
        } else {
            console.log('No documents found in the database.');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

testDatabase(); 