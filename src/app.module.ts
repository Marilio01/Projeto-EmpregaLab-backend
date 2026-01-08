import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StateModule } from './state/state.module';
import { CityModule } from './city/city.module';
import { AddressModule } from './address/address.module';
import { CacheModule } from './cache/cache.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { RolesGuard } from './guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { CorreiosModule } from './correios/correios.module';

@Module({
  imports: [
    // Configuração para ler variáveis de ambiente
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
      isGlobal: true, // Recomendado para não precisar importar ConfigModule em outros lugares
    }),
    
    // Configuração do Banco de Dados (Neon + Vercel)
    TypeOrmModule.forRoot({
      type: 'postgres',
      // Aqui usamos a URL completa que você copiou do Neon
      url: process.env.DATABASE_URL, 
      
      // Configuração de SSL Obrigatória para o Neon
      ssl: {
        rejectUnauthorized: false,
      },
      
      // Carrega as entidades automaticamente
      entities: [`${__dirname}/**/*.entity{.js,.ts}`],
      
      // ATENÇÃO: Para o primeiro deploy na Vercel, recomendo synchronize: true
      // Isso cria as tabelas automaticamente sem precisar rodar migrations manualmente.
      // Depois que estiver tudo estável, você pode voltar para migrations.
      synchronize: true, 
      
      // Desativei migrationsRun temporariamente para evitar erros no deploy serverless
      migrationsRun: false, 
    }),
    
    UserModule,
    StateModule,
    CityModule,
    AddressModule,
    CacheModule,
    AuthModule,
    JwtModule,
    CorreiosModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}