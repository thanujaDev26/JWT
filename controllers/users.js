const jwt = require("jsonwebtoken");


let refreshTokens=[];

exports.getUserLogin = async (req,res)=>{
    //DB
    //OK
    //const username= req.body.username;
    const user= req.body;
    const accessToken=jwt.sign(user,process.env.TOKEN_KEY,{expiresIn: '10s'});
    const refreshToken= jwt.sign(user,process.env.RE_TOKEN_KEY,{expiresIn: '24h'});
    refreshTokens.push(refreshToken);
    res.send({accessToken,refreshToken});
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