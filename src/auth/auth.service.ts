import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth.credentials.dto';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { RefreshToken } from './refreshtoken.entity';
import { JwtPayload } from './jwt-payload.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(RefreshToken)
    private refreshTokenRepository: Repository<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.usersRepository.create({
      email,
      password: hashedPassword,
    });

    try {
      await this.usersRepository.save(user);
      const { accessToken, refreshToken } = await this.signIn(
        authCredentialsDto,
      );
      return { accessToken, refreshToken };
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Username is already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.usersRepository.findOneBy({ email });

    const comparedPassword = await bcrypt.compare(user.password, password);

    if (!user && !comparedPassword) {
      throw new UnauthorizedException('Please check your login credentials');
    }

    const accessToken = await this.createAccessToken({ email, id: user.id });
    const refreshToken = await this.createRefreshToken({
      userUuid: user.id,
      email: user.email,
    });

    return { accessToken, refreshToken };
  }

  async createAccessToken(payload: JwtPayload) {
    const signedPayload = this.jwtService.sign(payload);

    return signedPayload;
  }

  async createRefreshToken({ userUuid, email }) {
    const token = await bcrypt.hash(userUuid, 10);
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 30);
    const refreshToken = this.refreshTokenRepository.create({
      userUuid,
      token,
      email,
      expiresIn: currentDate,
    });

    await this.refreshTokenRepository.save(refreshToken);

    return token;
  }

  async deleteRefreshToken(refreshToken: string) {
    await this.refreshTokenRepository.delete({ token: refreshToken });
  }

  async deleteRefreshTokens(accessToken: string, userUuid: string) {
    await this.validateToken(accessToken, true);
    await this.refreshTokenRepository.delete({ userUuid });
  }

  private async validateToken(
    token: string,
    ignoreExpiration = false,
  ): Promise<JwtPayload> {
    return this.jwtService.verify(token, {
      secret: 'privateKey51',
      ignoreExpiration,
    });
  }

  async generateAccessTokenFromRefresh(refreshTokenDto: RefreshTokenDto) {
    try {
      const token = await this.refreshTokenRepository.findOneBy({
        token: refreshTokenDto.token,
      });

      if (!token) {
        throw new NotFoundException('Refresh token not found');
      }

      if (new Date(token.expiresIn) < new Date()) {
        throw new UnauthorizedException('Refresh token expired');
      }

      const user = await this.usersRepository.findOneBy({ id: token.userUuid });

      if (!user) {
        throw new NotFoundException('User not found');
      }

      const accessToken = await this.createAccessToken({
        email: token.email,
        id: user.id,
      });

      await this.refreshTokenRepository.delete(token.uuid);

      const refreshToken = await this.createRefreshToken({
        userUuid: token.userUuid,
        email: token.email,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}
