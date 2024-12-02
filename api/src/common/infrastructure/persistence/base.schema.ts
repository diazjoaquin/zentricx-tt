import { EntitySchemaColumnOptions } from "typeorm";

export const BaseColumnSchemas: { [key: string] : EntitySchemaColumnOptions } = {
  id: {
    name: 'id',
    type: 'uuid',
    generated: 'uuid',
    primary: true,
  },
  createdAt: {
    name: 'created_at',
    type: 'timestamptz',
    createDate: true,
  },
  updatedAt: {
    name: 'updated_at',
    type: 'timestamptz',
    updateDate: true,
  }
};