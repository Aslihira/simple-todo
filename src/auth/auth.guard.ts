import { ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

// kyaa kaam hai iska bhai ??
// token validation it seems... yeahh
// 

export class JwtAuthGuard extends AuthGuard('jwt'){
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }
    handleRequest(err : any, user:any, info:any) {
        if( err || !user ){
            throw err || new UnauthorizedException();
        }
        return user;
    }
}