import { UserRepository } from "@/modules/users/repositories/user.repository";
import { RegisterUserDto } from "../dtos/register.dto";
import bcrypt from "bcrypt";

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  public async register(dto: RegisterUserDto) {
    const { email, password } = dto;

    const user = await this.userRepository.findByEmail(email);

    if (user) {
      throw new Error("User already exists");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    return await this.userRepository.create({
      ...dto,
      password: passwordHash
    });
  }
}
