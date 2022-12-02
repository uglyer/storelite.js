import { Column } from './Column';
import { EntityMetadata } from '../store/libs/ioc/EntityMetadata';

class TestModel {
  @Column('text')
  id: string = '';
  @Column('varchar')
  str: string = '';
  @Column('boolean')
  bool: boolean = false;
  @Column('integer')
  int: number = 0;
  @Column('float')
  float: number = 0;
  @Column('double')
  double: number = 0;
  @Column('json')
  json: { data: string } = { data: '' };
}

test('列类型元数据', () => {
  const list = EntityMetadata.getColumns(TestModel)!;
  expect(list != null).toBeTruthy();
  const keys = Object.keys(new TestModel());
  expect(list.length).toEqual(keys.length);
  const map: { [key: string]: string } = {
    id: 'string',
    str: 'string',
    bool: 'boolean',
    int: 'number',
    float: 'number',
    double: 'number',
    number: 'number',
    json: 'object',
  };
  for (let i = 0; i < list.length; i++) {
    expect(list[i].jsType).toEqual(map[list[i].fieldName]);
  }
});

test('json 合法性校验', () => {
  const handlerNotAllowFn = jest.fn();
  try {
    class T {
      @Column('json')
      json: { data: string } = { data: '' };
    }
  } catch (e) {
    expect(e).toEqual(null);
  }
  try {
    class T {
      @Column('text')
      json: { data: string } = { data: '' };
    }
  } catch (e) {
    handlerNotAllowFn();
  }
  expect(handlerNotAllowFn).toBeCalled();
});
