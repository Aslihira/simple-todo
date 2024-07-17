import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { DatabaseService } from "../database/database.service"; // Adjust the path accordingly

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly databaseService: DatabaseService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "Secret" // Replace with your actual secret key
        });
    }

     async validate(payload: { email: string }) {
         const user = await this.databaseService.user.findUnique({
            where:{
                email: payload.email,
            },
         });
         return user
     }
}
