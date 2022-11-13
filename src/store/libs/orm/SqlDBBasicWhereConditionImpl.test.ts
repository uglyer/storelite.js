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
    .eq('id', 'id-value')
    .eq({ str: null, bool: true }) as SqlDBBasicWhereConditionImpl<TestModel>;
  expect(model.toSql('and')).toEqual(
    "`id` = 'id-value' and `str` IS NULL and `bool` = true",
  );
  expect(model.toSql('or')).toEqual(
    "`id` = 'id-value' or `str` IS NULL or `bool` = true",
  );
});

test('not eq to sql', () => {
  const model = new SqlDBBasicWhereConditionImpl<TestModel>()
    .notEq('id', 'id-value')
    .notEq({
      str: null,
      bool: true,
    }) as SqlDBBasicWhereConditionImpl<TestModel>;
  expect(model.toSql('and')).toEqual(
    "`id` != 'id-value' and `str` IS NOT NULL and `bool` != true",
  );
  expect(model.toSql('or')).toEqual(
    "`id` != 'id-value' or `str` IS NOT NULL or `bool` != true",
  );
});

test('in & not in to sql', () => {
  const model = new SqlDBBasicWhereConditionImpl<TestModel>()
    .notIn('time', [4, 5, 6])
    .in('id', ['1', '2', '3']) as SqlDBBasicWhereConditionImpl<TestModel>;
  expect(model.toSql('and')).toEqual(
    "`time` NOT IN (4,5,6) and `id` IN ('1','2','3')",
  );
});
