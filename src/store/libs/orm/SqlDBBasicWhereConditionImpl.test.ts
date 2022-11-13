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
    "`id` = 'id-value' AND `str` IS NULL AND `bool` = true",
  );
  expect(model.toSql('or')).toEqual(
    "`id` = 'id-value' OR `str` IS NULL OR `bool` = true",
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
    "`id` != 'id-value' AND `str` IS NOT NULL AND `bool` != true",
  );
  expect(model.toSql('or')).toEqual(
    "`id` != 'id-value' OR `str` IS NOT NULL OR `bool` != true",
  );
});

test('in & not in to sql', () => {
  const model = new SqlDBBasicWhereConditionImpl<TestModel>()
    .notIn('time', [4, 5, 6])
    .in('id', ['1', '2', '3']) as SqlDBBasicWhereConditionImpl<TestModel>;
  expect(model.toSql('and')).toEqual(
    "`time` NOT IN (4,5,6) AND `id` IN ('1','2','3')",
  );
});
