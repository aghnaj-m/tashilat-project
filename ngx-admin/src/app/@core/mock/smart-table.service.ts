import { Injectable } from '@angular/core';
import { SmartTableData } from '../data/smart-table';

@Injectable()
export class SmartTableService extends SmartTableData {

  data = [{
    id: 1,
    firstName: 'Mark',
    lastName: 'Otto',
    login: '@mdo',
    cin: 'mdo@gmail.com',
    telephone: '28',
  }, {
    id: 2,
    firstName: 'Jacob',
    lastName: 'Thornton',
    login: '@fat',
    cin: 'fat@yandex.ru',
    telephone: '45',
  }, {
    id: 3,
    firstName: 'Larry',
    lastName: 'Bird',
    login: '@twitter',
    cin: 'twitter@outlook.com',
    telephone: '18',
  }, {
    id: 4,
    firstName: 'John',
    lastName: 'Snow',
    login: '@snow',
    cin: 'snow@gmail.com',
    telephone: '20',
  }, {
    id: 5,
    firstName: 'Jack',
    lastName: 'Sparrow',
    login: '@jack',
    cin: 'jack@yandex.ru',
    telephone: '30',
  }, {
    id: 6,
    firstName: 'Ann',
    lastName: 'Smith',
    login: '@ann',
    cin: 'ann@gmail.com',
    telephone: '21',
  }, {
    id: 7,
    firstName: 'Barbara',
    lastName: 'Black',
    login: '@barbara',
    cin: 'barbara@yandex.ru',
    telephone: '43',
  }, {
    id: 8,
    firstName: 'Sevan',
    lastName: 'Bagrat',
    login: '@sevan',
    cin: 'sevan@outlook.com',
    telephone: '13',
  }, {
    id: 9,
    firstName: 'Ruben',
    lastName: 'Vardan',
    login: '@ruben',
    cin: 'ruben@gmail.com',
    telephone: '22',
  },
    {
    'id': 10,
    'firstName': 'Lou',
    'lastName': 'Conner',
    'login': '@Sanchez',
    'cin': 'lousanchez@comtours.com',
    'telephone': 16,
  }];

  getData() {
    return this.data;
  }
}
