const ProfileModel=require('../models/profile.model');
const ValidateProfile=require('../validator/profile.validator');
const UserModel=require('../models/user.model');


//update profile
const Updateprofile=async (req , res)=>{
    try{
        const {errors, isValid} = ValidateProfile(req.body);
        if(!isValid){
            return res.status(404).json(errors);
        }
        else { 
            req.body.user=req.user.id;
            req.body.skialls= req.body.skills.split(',');
            const exist = await ProfileModel.findOne({
                user:req.user.id,
            });

            //check profile
            if(!exist){
                const data = await ProfileModel.create(req.body);
                return res.status(200).json({
                    message:"success",
                    data,
                });
            }else{
            const data = await ProfileModel.findByIdAndUpdate(
                {user: req.user.id},
                {
                    $set: req.body,
                }, 
                {
                    new: true,
                });
                return res.status(200).json({
                    message:"success",
                    data,
                });
                return res.status(200).json({
                    message:"success",
                    data,
                });
            
            }
        }
       
    }catch(error){
        res.status(500).json({error})
    }
};



/* ******************************************* */
const FindMyProfile=async (req , res)=>{
    try{
        const data = await ProfileModel.findOne({user:req.user.id});
        res.status(200).json({ data: data});
    }catch(error){
        res.status(500).json({error})
    }
};

module.exports = {
    Updateprofile,
    FindMyProfile,
};

