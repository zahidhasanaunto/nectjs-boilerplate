import {
  Body,
  HttpCode,
  InternalServerError,
  JsonController,
  Post
} from 'routing-controllers';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { UserRepository } from '../../../db/repositories/user/user.repository';
import {
  UserAlreadyExistsError,
  UserNotFoundError,
  WrongPasswordError
} from '../../errors';
import { JWTService } from '../../../services';
import { User } from './../../../db/entities/user/user.entity';
import { UserController } from '../user/user.controller';

@JsonController('/auth')
export class AuthController {
  constructor(
    @InjectRepository() private userRepository: UserRepository,
    private userController: UserController,
    private jwtService: JWTService
  ) { }

  @HttpCode(201)
  @Post('/register')
  public async register(@Body() userData: User) {
    const { email } = userData;

    const dupUser: any[] = await this.userRepository.checkUser({ email });

    if (dupUser.length > 0) {
      throw new UserAlreadyExistsError();
    }

    try {
      const createdUser: User = await this.userRepository.insertData(userData);
      delete createdUser.password;
      return createdUser;
    } catch (err) {
      if (err.name === 'QueryFailedError') {
        throw new UserAlreadyExistsError(
          'User with this credentials already exists'
        );
      } else {
        throw new InternalServerError(err);
      }
    }
  }

  @HttpCode(201)
  @Post('/login')
  public async login(
    @Body({ validate: false })
    loginData: User
  ) {
    const { username, password } = loginData;

    const user: any = await this.userRepository
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where('user.username = :username', { username })
      .getOne();

    if (!user) {
      throw new UserNotFoundError('User with this credentials not found');
    }

    const passwordIsCorrect = await user.checkPassword(password);

    if (!passwordIsCorrect) {
      throw new WrongPasswordError();
    }

    const _user: any = await this.userController.byId(user.uuid);

    const accessToken = await this.jwtService.makeAccessToken(_user.data);
    return {
      accessToken,
    };
  }
}
