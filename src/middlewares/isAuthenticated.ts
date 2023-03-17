import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
    sub: string
}

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ msg: 'Unauthorized!' });
    }

    const [, token] = authToken.split(" ");

    try {

        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;
        
        // inserindo o id do usuario vindo do token na variavel req
        req.user_id = sub;

        return next();

    } catch (err) {
        return res.status(401).json({ msg: 'Unauthorized!' });
    }
}