import { Column, BeforeInsert, BeforeUpdate, BaseEntity } from 'typeorm';

import { getCurrentUTCDate } from '../../shared/utils/common.util';

export class StarterBaseEntity extends BaseEntity {
  @BeforeInsert()
  saveUTCDate() {
    this.createdAt = getCurrentUTCDate();
    this.lastModifiedAt = getCurrentUTCDate();
  }

  @BeforeUpdate()
  updateUTCDate() {
    this.lastModifiedAt = getCurrentUTCDate();
  }

  @Column({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'timestamp without time zone' })
  lastModifiedAt: Date;
}
