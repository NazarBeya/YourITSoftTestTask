import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/database/entities/user.entity';
import { Repository } from 'typeorm';
import { PublicUserData } from './interface/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async getAllUsers(): Promise<Omit<PublicUserData, 'password'>[]> {
    return this.userRepository.find({
      select: ['email', 'id', 'userName', 'isActive'],
    });
  }
  async delete(userId: string): Promise<void> {
    await this.userRepository.delete({ id: +userId });
  }
  async update(
    userId: string,
    dto: Omit<PublicUserData, 'password'>,
  ): Promise<Omit<PublicUserData, 'password'>> {
    await this.userRepository.update(userId, dto);
    return await this.userRepository.findOne({
      where: { id: +userId },
      select: ['id', 'userName', 'email'],
    });
  }
}
