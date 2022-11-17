import { SqlDBWhereConditionBasicImpl } from './SqlDBWhereConditionBasicImpl';
import { SqlDBWhereConditionBasicSelectImpl } from './SqlDBWhereConditionBasicSelectImpl';

interface TestModel {
  id: string;
  str: string | null;
  bool: boolean;
  int: number;
  time: number;
}

class SelectWhereCondition<
  TestModel,
> extends SqlDBWhereConditionBasicSelectImpl<
  TestModel,
  SelectWhereCondition<TestModel>
> {
  protected getInstance(): SelectWhereCondition<TestModel> {
    return this;
  }

  toSql(): string | null {
    return super.toSql();
  }
}

test('eq to sql', () => {
  expect(
    new SelectWhereCondition<TestModel>()
      .andEq('id', 'id-value')
      .orEq({ str: null, bool: true })
      .orderBy('id', 'DESC')
      .groupBy('bool')
      .limit(10, 20)
      .toSql(),
  ).toEqual(
    "(`id` = 'id-value') OR (`str` IS NULL OR `bool` = true) GROUP BY `bool` ORDER BY `id` DESC LIMIT 10 OFFSET 20",
  );

  expect(
    new SelectWhereCondition<TestModel>()
      .andEq('id', 'id-value')
      .orEq({ str: null, bool: true })
      .orderBy(['id', 'time'], 'DESC')
      .groupBy(['bool', 'str'])
      .limit(10)
      .toSql(),
  ).toEqual(
    "(`id` = 'id-value') OR (`str` IS NULL OR `bool` = true) GROUP BY `bool`,`str` ORDER BY `id`,`time` DESC LIMIT 10",
  );
});
