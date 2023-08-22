import jwt from 'jsonwebtoken';
import config from '../config/token.js';

export const accessToken = (user) => {
    return jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin
    },
        config.ACCESS_TOKEN_SECRET,
    )
}

export const authentication = (req, res, next) => {
    const tokenAccess = req.headers.Authorization || req.headers.authorization;
    if(!tokenAccess?.startsWith('Bearer ')){
        res.status(400).send({
            message: "Không có quyền truy cập",
        })
    }
    else {
        const token = tokenAccess.split(' ')[1];
        jwt.verify(
            token, config.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if(err){
                    return res.status(400).send({
                        message: "Token invalid",
                    })
                }
                else {
                    req.user = data;
                    next();
                }
            }
        )
    }
}

export const authenticationCookie = (req, res, next) => {
    const cookies = req.cookies;
    if (!cookies || !cookies.accessToken) {
        return res.status(400).json({
            message: "INVALID TOKEN",
        });
    }
    else {
        const token = cookies.accessToken;
        jwt.verify(
            token, config.ACCESS_TOKEN_SECRET,
            (err, data) => {
                if(err){
                    return res.status(400).json({
                        message: "TOKEN INVALID",
                    })
                }
                else {
                    req.user = data;
                    next();
                }
            }
        )
    }
}

export const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        return next();
    }
    return res.status(400).json({
        message: "Không đủ quyền"
    })
}