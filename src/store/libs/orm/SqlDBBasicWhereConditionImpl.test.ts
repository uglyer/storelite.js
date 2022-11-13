import { SqlDBBasicWhereConditionImpl } from '@/store/libs/orm/SqlDBBasicWhereConditionImpl';

interface TestModel {
  id: string;
  str: string | null;
  bool: boolean;
  int: number;
  time: number;
}

test('eq to sql', () => {
  const model = new SqlDBBasicWhereConditionImpl<TestModel>()
    .eq('id', 'id')
    .eq({ str: null, bool: true }) as SqlDBBasicWhereConditionImpl<TestModel>;
  expect(model.toSql('and')).toEqual('hello world');
});
