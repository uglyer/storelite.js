import { Column } from './Column';

class TestModel {
  @Column('text')
  id: string = '';
  @Column('varchar')
  str: string | null = null;
  @Column('boolean')
  bool: boolean = false;
  @Column('integer')
  int: number = 0;
  @Column('float')
  float: number = 0;
  @Column('double')
  double: number = 0;
}

test('列类型元数据', () => {
  new TestModel();
});
