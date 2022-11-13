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

test('like to sql', () => {
  const model = new SqlDBBasicWhereConditionImpl<TestModel>()
    .like('id', '%id-val%')
    .like('str', 'id-val%') as SqlDBBasicWhereConditionImpl<TestModel>;
  expect(model.toSql('and')).toEqual(
    "`id` LIKE '%id-val%' AND `str` LIKE 'id-val%'",
  );
  expect(model.toSql('or')).toEqual(
    "`id` LIKE '%id-val%' OR `str` LIKE 'id-val%'",
  );
});

test('between and to sql', () => {
  const model = new SqlDBBasicWhereConditionImpl<TestModel>()
    .betweenAnd('int', 1, 10)
    .like('str', 'id-val%') as SqlDBBasicWhereConditionImpl<TestModel>;
  expect(model.toSql('and')).toEqual(
    "`int` (BETWEEN 1 AND 10) AND `str` LIKE 'id-val%'",
  );
});

test('less than more than to sql', () => {
  const model = new SqlDBBasicWhereConditionImpl<TestModel>()
    .lessThan('int', 200)
    .moreThan('int', 100)
    .lessThanOrEq('int', 500)
    .moreThanOrEq('int', 400) as SqlDBBasicWhereConditionImpl<TestModel>;
  expect(model.toSql('and')).toEqual(
    '`int` < 200 AND `int` > 100 AND `int` <= 500 AND `int` >= 400',
  );
});
