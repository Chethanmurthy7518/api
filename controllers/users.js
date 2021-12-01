const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

const userModel = require("../models/users");
const register = async (req, res, next) => {
  const { fullName, email, password, role } = req.body;

  const emailExists = await userModel.findOne({ email: email });

  try {
    if (emailExists) {
      res.status(400).json({
        error: true,
        message: "Email Already Exists",
        data: null,
      });
    } else {
      const saltRounds = 10;

      //salting
      const salt = await bcrypt.genSalt(saltRounds);
      console.log(salt);

      //hashing
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log(hashedPassword);

      await userModel.insertMany([
        {
          fullName,
          
          email,
          role,
          password: hashedPassword,
        },
      ]);
      res.status(200).json({
        error: false,
        message: "User Registration Successfull",
        data: null,
      });
    }
  } catch (err) {
    next(err);
  }
};

const login = async (req,res,next)=>{
    const {email,password} = req.body
    // console.log(email,password);
    try{
        const userData  = await userModel.findOne({email}).lean()
        // console.log(userData.password);
        if(userData){
          const {fullName,role} = userData
            const isPasswordMatched = await bcrypt.compare(password , userData.password)
            // console.log(userData);
            if(isPasswordMatched){
              const payload = {
                fullName,role
              }
              const token = jwt.sign(payload,process.env.SECRET_KEY,{
                expiresIn:'10h'
              })
                res.status(200).json({
                    error:false,
                    message:"Login Successfull",
                    data:{
                      fullName,
                        token
                    },
                })
            }else{
                res.status(401).json({
                    error:true,
                    message:"Invalid Password",
                    data:null,
                })
            }

        }else{
            res.status(400).json({
                error: true,
                message: "Email Doesnt Exists",
                data: null,


            })

        }

    }catch(err){
        console.log(err);
        next(err)
    }
}

module.exports = {
  register,
  login,
};
