import { Client, Databases, Query } from 'appwrite';

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6824a37b0024b3b50c27')
    .setJWT('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjA4NzY4MDAsImlzcyI6Imh0dHBzOi8vY2xvdWQuYXBwd3JpdGUuaW8vdjEiLCJpYXQiOjE3MjA4NzY4MDAsIm5iZiI6MTcyMDg3NjgwMCwic3ViIjoic3RhbmRhcmRfODJlNzhiMDM0NTg0MjJmZTg3YzUwMmQxNTY5NmViZWE1ZGYwNDYwOWQwOTBmMjZjMGE2Y2I4NmQ4YTVmZjAzYTE2OGNmOTk1ZGJhMjk0NTQwMGNlZTY4YTBkYjNmYWFiNzkxZmM3N2Q0NjNlN2Y3MGQyY2M2NjQyOWQ2ZWUyM2ZlZjQyYjJhOTFhOTY1OWY5ZDljYjA0MWMwZTIyYWNkZmMyNzljNWRmZDhkYTVjN2QxYjg2MTI3NTNiMDVkZjVlMjFiYWQyZjQ0N2EwMWQ0MGVlM2QyZjEzMjI5MzAxYTQyM2ZjOTdlOWVlNjc4ZjQyNGUyNzdhYWNlYzU1ZDEyMyJ9.standard_82e78b03458422fe87c502d15696ebea5df04609d090f26c0a6cb86d8a5ff03a168cf995dba2945400cee68a0db3faab791fc77d463e7f70d2cc66429d6ee23fef42b2a91a9659f9d9cb041c0e22acdfc279c5dfd8da5c7d1b8612753b05df5e21bad2f447a01d40ee3d2f13229301a423fc97e9ee678f424e277aacec55d123');

const databases = new Databases(client);

const DATABASE_ID = '6824a3f4000b44d4a2cc';
const READINGS_COLLECTION_ID = '6824b220001571fa0ac7';

export const appwriteService = {
    // Get the latest sensor reading
    getLatestReading: async () => {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                READINGS_COLLECTION_ID,
                [
                    Query.orderDesc('$createdAt'),
                    Query.limit(1)
                ]
            );
            if (response.documents.length === 0) {
                console.log('No readings found in the database');
                return null;
            }
            return response.documents[0];
        } catch (error) {
            console.error('Error fetching latest reading:', error);
            throw error;
        }
    },

    // Get readings for a specific time range
    getReadings: async (timeRange = '24h') => {
        try {
            const now = new Date();
            let startTime;

            switch (timeRange) {
                case '1h':
                    startTime = new Date(now - 60 * 60 * 1000);
                    break;
                case '24h':
                    startTime = new Date(now - 24 * 60 * 60 * 1000);
                    break;
                case '7d':
                    startTime = new Date(now - 7 * 24 * 60 * 60 * 1000);
                    break;
                case '30d':
                    startTime = new Date(now - 30 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    startTime = new Date(now - 24 * 60 * 60 * 1000);
            }

            const response = await databases.listDocuments(
                DATABASE_ID,
                READINGS_COLLECTION_ID,
                [
                    Query.greaterThan('$createdAt', startTime.toISOString()),
                    Query.orderDesc('$createdAt'),
                    Query.limit(100)
                ]
            );
            
            if (response.documents.length === 0) {
                console.log('No readings found for the specified time range');
                return [];
            }
            
            return response.documents;
        } catch (error) {
            console.error('Error fetching readings:', error);
            throw error;
        }
    },

    // Get readings for chart data
    getChartData: async (timeRange = '24h') => {
        try {
            const readings = await appwriteService.getReadings(timeRange);
            
            if (readings.length === 0) {
                return {
                    labels: [],
                    datasets: []
                };
            }

            // Process readings into chart format
            const labels = readings.map(reading => 
                new Date(reading.$createdAt).toLocaleTimeString()
            ).reverse();

            const datasets = [
                {
                    label: 'pH Level',
                    data: readings.map(reading => reading.ph).reverse(),
                    borderColor: '#0EA5E9',
                    backgroundColor: 'rgba(14, 165, 233, 0.1)',
                    fill: true,
                },
                {
                    label: 'Temperature (°C)',
                    data: readings.map(reading => reading.temperature).reverse(),
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: true,
                },
                {
                    label: 'Turbidity (NTU)',
                    data: readings.map(reading => reading.turbidity).reverse(),
                    borderColor: '#10B981',
                    backgroundColor: 'rgba(16, 185, 129, 0.1)',
                    fill: true,
                },
                {
                    label: 'TDS (ppm)',
                    data: readings.map(reading => reading.tds).reverse(),
                    borderColor: '#6366F1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                }
            ];

            return { labels, datasets };
        } catch (error) {
            console.error('Error getting chart data:', error);
            return {
                labels: [],
                datasets: []
            };
        }
    }
}; 