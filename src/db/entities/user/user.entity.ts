import { IsEmail } from 'class-validator';
import Container from 'typedi';
import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { BcryptService } from '../../../services';
import { UserInfo } from './userInfo.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public uuid?: string;

  @Column({ nullable: false, unique: true })
  public username: string;

  @Column({ nullable: false, unique: true })
  @IsEmail()
  public email: string;

  @Column({ nullable: false, unique: false, select: false })
  public password: string;

  @Column({ nullable: true })
  public isEmailConfirmed: number;

  @Column({ nullable: true })
  public token: string;

  @Column({ nullable: true })
  public refreshedToken: string;

  @OneToOne(
    type => UserInfo,
    userInfo => userInfo.user
  )
  @JoinColumn()
  public userInfo?: UserInfo;



  @CreateDateColumn()
  public createdAt?: Date;

  @UpdateDateColumn()
  public updatedAt?: Date;

  constructor() { }

  public async checkPassword(plainPassword: string): Promise<boolean> {
    const bcryptService = Container.get(BcryptService);
    const passwordIsCorrect = bcryptService.compareHash(
      plainPassword,
      this.password
    );
    return passwordIsCorrect;
  }

  @BeforeInsert()
  private async _hashPassword?() {
    const bcryptService = Container.get(BcryptService);
    this.password = await bcryptService.hashString(this.password);
  }
}
