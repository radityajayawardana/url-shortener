import { Body, Controller, Get, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';
import { LinkService } from './link.service';
import { Response } from 'express';
import { dtoUpdateUrl } from './dto/uplink.dto';
import { dtoCreateUrl } from './dto/link.dto';

@Controller()
export class LinkController {
  constructor(private serviceLink: LinkService) { }
  @Post()
  async buatUrl(@Body() dataUrl: dtoCreateUrl, @Res() res: Response): Promise<Response> {
    function generateRandomString(): string {
      const characters = 'abcdefghijklmnopqrstuvwxyz';
      let result: string = '';
      for (let i = 0; i < 5; i++) {
        const randomIndex: number = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }

      return result;
    }
    let isunik: boolean = false;
    let random: string;
    while (!isunik) {
      random = generateRandomString();
      const cekdb = await this.serviceLink.geturl(random);

      if (!cekdb) {
        isunik = true;
      }
    }
    await this.serviceLink.shorturl({
      link_panjang: dataUrl.link_panjang,
      link_pendek: random
    });
    return res.json({
      link_panjang: dataUrl.link_panjang,
      link_pendek: random
    });
  }

  @Get(':link')
  async geturl(@Param('link') link: string, @Res() res: Response): Promise<void> {
    const data = await this.serviceLink.geturl(link);
    const link_p: string = data.link_panjang;
    if (data) {
      return res.redirect(link_p);
    } else {
      res.status(HttpStatus.NOT_FOUND).send();
    }

  }

  @Patch()
  async customurl(@Body() updateLink: dtoUpdateUrl, @Res() res: Response): Promise<void> {
    const cek = await this.serviceLink.geturl(updateLink.custom);
    if (!cek) {
      const data = await this.serviceLink.updateurl(updateLink.link_pendek, updateLink.custom);
      res.status(HttpStatus.OK).send();
    } else {
      res.status(HttpStatus.CONFLICT).send();
    }
  }

}
