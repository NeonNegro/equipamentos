import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './entity/auth.entity';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService){}

    async login(email: string, password: string): Promise<AuthEntity> {

        const customer = await this.prisma.customer.findUnique({where: {email: email }});

        if(!customer)
            throw new NotFoundException(`Nenhum usuário encontrado com o email ${email}`);
        
        const isPasswordValid = await bcrypt.compare(password, customer.password);

        if(!isPasswordValid)
            throw new UnauthorizedException("Senha incorreta");

        return {
            accessToken: this.jwtService.sign({customerId: customer.id})
        }
        
    }
}
