const jwt = require("jsonwebtoken");
let refreshTokens=[];
let User = require('../models/user');

exports.getUserLogin = async (req,res)=>{
    try {
        let userToFind = await User.findOne({email:req.body.email});
        const user= req.body;
        const accessToken=jwt.sign(user,process.env.TOKEN_KEY,{expiresIn: '10s'});
        const refreshToken= jwt.sign(user,process.env.RE_TOKEN_KEY,{expiresIn: '24h'});
        refreshTokens.push(refreshToken);
        if(!userToFind){
            return res.status(404).json({
                message : 'User not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data : {
                userToFind,
                accessToken,
                refreshToken
            }
        })

        // refreshTokens.push(refreshToken);
        // res.send({accessToken,refreshToken});
    }
    catch(err){
        res.sendStatus(403)
    }


}

exports.getToken = async (req,res)=>{
    const refreshToken = req.body.refreshToken;
    if(refreshToken==null) res.sendStatus(401);
    if(!refreshTokens.includes(refreshToken)) res.sendStatus(403);
    jwt.verify(refreshToken,process.env.RE_TOKEN_KEY,(err,user)=>{
        if(err) res.sendStatus(403);
        const accessToken=jwt.sign({name:user.name},process.env.TOKEN_KEY,{expiresIn: '10s'});
        res.send({accessToken});
    });
}

exports.getUserLogout = async (req,res)=>{
    const refreshToken = req.body.refreshToken;
    refreshTokens = refreshTokens.filter(t=> t !== refreshToken);
    res.sendStatus(204);
}

exports.getUserSignup = async (req,res)=>{
    try {
        let user = await User.create(req.body);
        res.status(200).json({
            status:"success",
            data : {
                user
            }
        });
    }
    catch (error){
        console.log(error);
    }

}