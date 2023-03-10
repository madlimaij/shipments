import React, { useState } from 'react';
import Table, { dRow } from '../components/Table';
import { fetchData } from '../services/api';
import useEffectAsync from '../utils/useEffectAsync';

const ShipmentsPage = () => {
  const [tableData, setTableData] = useState<dRow[]>([]);

  useEffectAsync(async () => {
    const shippingsData = await fetchData();
    setTableData(shippingsData);
  }, []);

  return (
    <div>
      <h1 className='pt-4 pb-3'>Shipments</h1>
        {tableData.length > 0 ? (
          <Table data={tableData} setTableData={setTableData} />
        ) : (
          <p>No data to display</p>
        )}
    </div>
  );
};

export default ShipmentsPage;
