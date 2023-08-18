import { Module } from '@nestjs/common';
import { LinkService } from './link.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Link } from 'src/entities/link.entity';
import { LinkController } from './link.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinkController],
  providers: [LinkService]
})
export class LinkModule { }
