import { SqlDBWhereConditionBasicImpl } from './SqlDBWhereConditionBasicImpl';

interface TestModel {
  id: string;
  str: string | null;
  bool: boolean;
  int: number;
  time: number;
}

class WhereCondition<TestModel> extends SqlDBWhereConditionBasicImpl<
  TestModel,
  WhereCondition<TestModel>
> {
  protected getInstance(): WhereCondition<TestModel> {
    return this;
  }

  toSql(): string | null {
    return super.toSql();
  }
}

test('eq to sql', () => {
  expect(
    new WhereCondition<TestModel>()
      .andEq('id', 'id-value')
      .orEq({ str: null, bool: true })
      .toSql(),
  ).toEqual("(`id` = 'id-value') OR (`str` IS NULL OR `bool` = true)");
  expect(
    new WhereCondition<TestModel>()
      .andEq('id', 'id-value')
      .or((condition) => {
        condition.eq({ str: null, bool: true });
        return 'AND';
      })
      .toSql(),
  ).toEqual("(`id` = 'id-value') OR (`str` IS NULL AND `bool` = true)");
});

test('not eq to sql', () => {
  expect(
    new WhereCondition<TestModel>()
      .andNotEq('id', 'id-value')
      .orNotEq({ str: null, bool: true })
      .toSql(),
  ).toEqual("(`id` != 'id-value') OR (`str` IS NOT NULL OR `bool` != true)");
  expect(
    new WhereCondition<TestModel>()
      .andNotEq('id', 'id-value')
      .or((condition) => {
        condition.notEq({ str: null, bool: true });
        return 'AND';
      })
      .toSql(),
  ).toEqual("(`id` != 'id-value') OR (`str` IS NOT NULL AND `bool` != true)");
});
