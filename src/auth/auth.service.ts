import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
  }
}
