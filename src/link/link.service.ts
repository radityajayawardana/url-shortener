import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from 'src/entities/link.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private linkRepo: Repository<Link>
  ) { }
  async shorturl(dataurl: Partial<Link>): Promise<Link> {
    const data = this.linkRepo.create(dataurl);
    await this.linkRepo.save(data);
    return data;
  }
  async geturl(link_pendek: string): Promise<Link> {
    const data = await this.linkRepo.findOne({ where: { link_pendek } });
    return data;
  }
  async updateurl(link_pendek: string, custom_link: string): Promise<boolean> {
    const data = await this.linkRepo.findOne({ where: { link_pendek } });
    if (!data) {
      return false
    }
    const updateLink: object = {
      link_pendek: custom_link,
      link_panjang: data.link_panjang,
    };
    await this.linkRepo.update(data.id, updateLink);
    return true;
  }
}
