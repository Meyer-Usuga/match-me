import { UserRepository } from "@/modules/users/repositories/user.repository";
import { AnalysisRepository } from "@/modules/analysis/repositories/analysis.respository";
import { AppError } from "@/utils/errors/app-error";
import { AuthResponseDto, LoginUserDto, RegisterUserDto } from "../dtos";
import bcrypt from "bcrypt";
import { TokenService } from "./token.service";

export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly analysisRepository: AnalysisRepository,
  ) {}

  public async register(dto: RegisterUserDto): Promise<AuthResponseDto> {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new AppError({
        message: "Email already in use",
        statusCode: 409,
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const createdUser = await this.userRepository.create({
      ...dto,
      password: passwordHash,
    });

    const accessToken = this.tokenService.generateToken({
      userId: createdUser.id,
    });

    return {
      name: createdUser.name,
      email: createdUser.email,
      accessToken,
      countAnalisis: 0,
    };
  }

  public async login(dto: LoginUserDto): Promise<AuthResponseDto> {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError({
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError({
        message: "Invalid credentials",
        statusCode: 401,
      });
    }

    const accessToken = this.tokenService.generateToken({ userId: user.id });

    const countAnalisis = await this.analysisRepository.countByUserId(user.id);

    return {
      name: user.name,
      email: user.email,
      accessToken,
      countAnalisis,
    };
  }
}
