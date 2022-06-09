import { createClient } from 'redis';
import logger from './logger';

export const client = createClient();

const clientRedis = async () => {
    try {
        await client.connect();
        logger.info('Connected to the Redis Database');

    } catch (error) {
        logger.error('Could not Connect to the Database', error);
    }
}

export default clientRedis;