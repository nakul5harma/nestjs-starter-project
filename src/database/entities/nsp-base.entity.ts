import { Column, BeforeInsert, BeforeUpdate, BaseEntity } from 'typeorm';

import { getCurrentUTCDate } from '../../common/utils/common.util';

export class NSPBaseEntity extends BaseEntity {
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
