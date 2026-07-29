import { UserRepository } from "@/modules/users/repositories/user.repository";
import { AppError } from "@/utils/errors/app-error";
import { 
  AuthResponseDto, 
  LoginUserDto, 
  RegisterUserDto 
} from "../dtos";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: RegisterUserDto): Promise<AuthResponseDto> {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new AppError({
        message: "Email already in use",
        statusCode: 409
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await this.userRepository.create({
      ...dto,
      password: passwordHash
    });

    return {
      name: dto.name,
      email: dto.email,
    };
  }

  public async login(dto: LoginUserDto): Promise<AuthResponseDto>{
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

    return {
      name: user.name,
      email: user.email,
    };
  }
}
