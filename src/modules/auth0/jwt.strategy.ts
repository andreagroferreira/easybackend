import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import * as dotenv from 'dotenv';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            secretOrKeyProvider: passportJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
            }),

            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            audience: process.env.AUTH0_AUDIENCE,
            issuer: `https://${process.env.AUTH0_DOMAIN}/`,
            algorithms: ['RS256'],
        });
    }

    validate(payload: any, done: VerifiedCallback) {
        if (!payload) {
            done(new UnauthorizedException(), false); // 2
        }

        return done(null, payload);
    }
}
