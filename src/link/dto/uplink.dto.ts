import { ApiProperty } from "@nestjs/swagger";

export class dtoUpdateUrl {
  @ApiProperty()
  readonly custom: string;

  @ApiProperty()
  readonly link_pendek: string;
}
