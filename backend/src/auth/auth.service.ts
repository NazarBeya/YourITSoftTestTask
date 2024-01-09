import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { sign } from 'jsonwebtoken';
import { User } from 'src/database/entities/user.entity';
import { UserDtoCreate, UserloginDto } from 'src/user/dto/user.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Auth } from 'src/database/entities/auth.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    public readonly userRepository: Repository<User>,
    @InjectRepository(Auth)
    public readonly authRepository: Repository<Auth>,
  ) {}

  async register(data: UserDtoCreate): Promise<string> {
    const hashedPassword = await this.hashPassword(data.password);
    const user: User = new User();
    user.userName = data.userName;
    user.email = data.email;
    user.password = hashedPassword;
    const userFromDb = await this.userRepository.save(user);
    const token = sign({ id: userFromDb.id }, process.env.SECRET_KEY as string);
    const auth = new Auth();
    auth.user = userFromDb;
    auth.accessToken = token;
    await this.authRepository.save(auth);
    return token;
  }
  async login(data: UserloginDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email: data.email },
    });
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    const comparePassword = await this.comparePassword(
      data.password,
      user.password,
    );
    if (!comparePassword) {
      throw new NotFoundException('Invalid credentials');
    }
    return sign({ id: user.id }, process.env.SECRET_KEY as string);
  }

  async hashPassword(password: string) {
    return bcrypt.hash(password, 10);
  }
  async comparePassword(password: string, hashPassword) {
    return bcrypt.compare(password, hashPassword);
  }
}
