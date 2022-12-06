import { Column } from '../../decorator/Column';
import { EntityMetadata } from './ioc/EntityMetadata';
import { StoreLiteDynamicFrom } from './StoreLiteDynamicFrom';
import StoreLite from '../../StoreLite';

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

test('字典写测试', async () => {
  const db = await StoreLite.getDB();
  const from = new StoreLiteDynamicFrom<{ model: TestModel }, {}>(db, {
    dictionary: { model: new TestModel() },
    list: {},
  });
  from.setDictionary('model', {
    id: 'x',
    str: 'str',
    bool: true,
    int: 1,
    float: 1.1,
    double: Math.PI,
    json: { data: 'json-data' },
  });
  from.getDictionary('model');
});
