import {User} from "../db/modules/usermodel.js";
import logger from '../utils/logger.js'
export const signup=async(req,res)=>{
    try{
        logger.info('hi');
    }
    catch(err){
        logger.error(err);
    }
}