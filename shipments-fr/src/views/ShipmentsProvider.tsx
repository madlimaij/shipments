import React, { createContext, ReactNode, useContext, useState } from 'react';
import { deleteRow, fetchData, updateShipment } from '../services/api';
import useEffectAsync from '../utils/useEffectAsync';
import Spinner from 'react-bootstrap/Spinner';

export type Shipment = {
  orderNo: string;
  consignee: string;
  customer: string;
  date: string;
  status: string;
  trackingNo: string;
};

type ShipmentsState = {
  shipments: Shipment[];
  //   addShipment: (shipment: Shipment) => void;
  updateShipments: (orderNo: string, updatedShipment: Shipment) => void;
  deleteShipment: (orderNo: string) => void;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  error: boolean;
};

const ShipmentsContext = createContext<ShipmentsState>({
  shipments: [],
  //   addShipment: () => {},
  updateShipments: () => {},
  deleteShipment: () => {},
  setError: () => {},
  error: false,
});

type ShipmentsProviderProps = {
  children: ReactNode;
};

export const ShipmentsProvider: React.FC<ShipmentsProviderProps> = ({
  children,
}) => {
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffectAsync(async () => {
    const response = await fetchData();
    if (response && response.status === 200) {
      setShipments(response.data);
      setIsLoading(false);
    } else {
      setError(true);
    }
  }, []);

  /*   const addShipment = (shipment: Shipment) => {
    setShipments([...shipments, shipment]);
  };
 */

  const updateShipments = async (
    orderNo: string,
    updatedShipment: Shipment
  ) => {
    const shipmentsCopy = [...shipments];
    const newShipment = { ...shipments, ...updatedShipment }; //merging the key-value pairs of both objects into a new objec
    const response = await updateShipment(orderNo, newShipment);
    if (response && response.status === 200) {
      setShipments(
        shipmentsCopy.map((shipment) =>
          shipment.orderNo === orderNo ? newShipment : shipment
        )
      );
    } else setError(true);
  };

  const deleteShipment = async (id: string) => {
    const response = await deleteRow(id);
    if (response && response.status === 200) {
      const shipmentsCopy = [...shipments];
      setShipments(shipmentsCopy.filter((row) => row.orderNo !== id));
    } else setError(true);
  };

  const contextValue: ShipmentsState = {
    shipments,
    // addShipment,
    updateShipments,
    deleteShipment,
    setError,
    error,
  };

  return (
    <ShipmentsContext.Provider value={contextValue}>
      {isLoading ? (
        <div className="mt-5 pt-5 d-flex justify-content-center">
          <Spinner animation="grow" role="status" />
        </div>
      ) : (
        <>{children}</>
      )}
    </ShipmentsContext.Provider>
  );
};

export const useShipments = () => useContext(ShipmentsContext);
