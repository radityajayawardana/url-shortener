import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  link_panjang: string;

  @Column()
  link_pendek: string;
}
