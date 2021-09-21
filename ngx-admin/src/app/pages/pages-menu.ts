import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'IoT Dashboard',
    icon: 'home-outline',
    link: '/pages/iot-dashboard',
  },

  {
    title: 'Tables & Data',
    icon: 'grid-outline',
    children: [
      {
        title: 'Users',
        link: '/pages/tables/smart-table',
      },
      {
        title: 'Bill',
        link: '/pages/tables/smart-table4',
      },
      {
        title: 'Transfert',
        link: '/pages/tables/smart-table5',
      },
      {
        title: 'Refill',
        link: '/pages/tables/smart-table3'
      },
    ],
  },
];
