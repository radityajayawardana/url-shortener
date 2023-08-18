import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from './entities/link.entity';
import { LinkModule } from './link/link.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: "raditya",
    password: "raditya",
    database: "testshort",
    entities: [Link],
    synchronize: true
  }), LinkModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
