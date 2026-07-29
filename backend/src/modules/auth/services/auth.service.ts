import { UserRepository } from "@/modules/users/repositories/user.repository";
import { RegisterUserDto } from "../dtos/register.dto";
import bcrypt from "bcrypt";
import { AppError } from "@/utils/errors/app-error";
import { LoginUserDto } from "../dtos/login.dto";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: RegisterUserDto) {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new AppError({
        message: "Email already in use",
        statusCode: 409
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return await this.userRepository.create({
      ...dto,
      password: passwordHash
    });
  }

  public async login(dto: LoginUserDto){
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError({
        message: "Invalid credentials",
        statusCode: 401
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError({
        message: "Invalid credentials",
        statusCode: 401
      });
    }

    return user;
  }
}
