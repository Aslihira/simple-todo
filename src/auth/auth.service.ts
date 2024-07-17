import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterUserDto } from './dto/register.dto';
import {LoginDto} from './dto/login.dto';
//import { UpdateAuthDto } from './dto/update-auth.dto';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly dataservice: DatabaseService,
    private readonly jwtservice: JwtService
  ){}

  async login(LoginData: LoginDto){
    const user= await this.dataservice.user.findFirst({
      where:{
        email: LoginData.email
      }
    })
    if(!user){
      throw new NotFoundException("No user exists with entered email")
    }
    const validatePassword = await bcrypt.compare(LoginData.password, user.password)
    if(!validatePassword){
      throw new NotFoundException("wrong password")
    }
    return{
      token: this.jwtservice.sign({email: LoginData.email})
    }
  }

  async register(registerData: RegisterUserDto) {

    const user =await this.dataservice.user.findFirst(
      {
        where:{
          email : registerData.email
        }
      }
    )
    if(user){
      throw new BadGatewayException('user with email already exists')
  
    }
     registerData.password = await bcrypt.hash(registerData.password, 10)
     const res = await this.dataservice.user.create({data: registerData})

    return res;
  }

 
}
