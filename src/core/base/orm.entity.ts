import { BaseEntity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IResource } from '../interfaces/entity-resource.interface';

export abstract class OrmEntity<IEntityResponse, IEntityDetailResponse>
  extends BaseEntity
  implements IResource<IEntityResponse, IEntityDetailResponse>
{
  abstract responseDto(): Promise<IEntityResponse>;
  abstract detailResponseDto(): Promise<IEntityDetailResponse>;

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  created: Date;

  @Column()
  updated: Date;

  async commit() {
    if (this.id === undefined || this.id === null || this.id === '') {
      this.created = new Date();
    }
    this.updated = new Date();
    await this.save();
  }
}
