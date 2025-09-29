
import {Subject} from  '../db/modules/Subject.js';
import logger from '../utils/logger.js';
export const getSubject=async(req,res)=>{
    try{
        const Subjects=await Subject.find();
        logger.info('fetched all the products');
        return res.status(200).json(Subjects);
    }
    catch(err){
        logger.error(err);
    }
}
export const getSubjectByName=async(req,res)=>{
    try{
        const {name}=req.params;
        const target=await Subject.findOne({name:name});
        if(!target){
            logger.info('not found');
            return res.status(404);
        }
        logger.info('found the subject');
        return res.status(200).json(target);


    }
    catch(error){
        logger.error(error);
    }

}
