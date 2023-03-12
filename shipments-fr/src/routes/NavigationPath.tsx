import Home from '../views/Home';
import ShipmentsPage from '../views/ShipmentsPage';

type NavType = {
  name: string;
  path: string;
  component: React.FC;
};

const NavigationPath: NavType[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Shipments',
    path: '/shipments',
    component: ShipmentsPage,
  },
];

export default NavigationPath;
