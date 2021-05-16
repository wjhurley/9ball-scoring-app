import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { EntityRepository, Repository } from 'typeorm';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

export const duplicateEntryErrorCode = '23505';

export type UserNameAndEmail = Pick<User, 'email' | 'firstName' | 'lastName'>;

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  public async signUp(createUserDto: CreateUserDto): Promise<void> {
    const { email, firstName, lastName, password } = createUserDto;

    const user = new User();
    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === duplicateEntryErrorCode) {
        throw new ConflictException('Email already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  public async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserNameAndEmail | null> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      };
    } else {
      return null;
    }
  }
}
