import { Column } from '@/decorator/Column';

/**
 * 动态表单原始结构实体类
 * @author uglyer
 * @date 2022/12/11 20:28
 */
export class StoreLiteRawEntity {
  @Column('integer', { primaryKey: true })
  id: number = 0;
  @Column('varchar', { dbFieldName: 'table_name' })
  tableName: string = '';
  @Column('json')
  content: any = '{}';
}
