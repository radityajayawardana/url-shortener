import { ApiProperty } from "@nestjs/swagger";

export class dtoCreateUrl {
  @ApiProperty()
  readonly link_panjang: string;
}
