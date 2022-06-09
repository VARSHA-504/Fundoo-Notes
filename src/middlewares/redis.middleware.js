import { client } from '../config/redis';
import HttpStatus from 'http-status-codes';

export const getRedisData = async  (req, res, next) => {
   const data = await client.get('allNotes');
    if(data != null){
        console.log("Data from Redis Server");
        res.status(HttpStatus.OK).json({
            code: HttpStatus.OK,
            data: JSON.parse(data),
            message: "All notes fetched successfully"
        });
    } else {
        next();
    }
}