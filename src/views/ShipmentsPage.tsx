import Table from '../components/Table';
import { ShipmentsProvider } from './ShipmentsProvider';

const ShipmentsPage = () => {
  return (
    <ShipmentsProvider>
      <div>
        <h1 className="pt-4 pb-3">Shipments</h1>
        <Table />
      </div>
    </ShipmentsProvider>
  );
};

export default ShipmentsPage;
