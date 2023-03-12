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
};

// Define the context object for managing shipments state
const ShipmentsContext = createContext<ShipmentsState>({
  shipments: [],
  //   addShipment: () => {},
  updateShipments: () => {},
  deleteShipment: () => {},
});

type ShipmentsProviderProps = {
  children: ReactNode;
};

export const ShipmentsProvider: React.FC<ShipmentsProviderProps> = ({
  children,
}) => {
  // Define the state for shipments
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffectAsync(async () => {
    const shipmentsData = await fetchData();
    setShipments(shipmentsData);
    setIsLoading(false);
    console.log(shipmentsData);
  }, []);

  /*   const addShipment = (shipment: Shipment) => {
    setShipments([...shipments, shipment]);
  };
 */

  // Update an existing shipment in the state
  const updateShipments = (orderNo: string, updatedShipment: Shipment) => {
    const shipmentsCopy = [...shipments];
    setShipments(
      shipmentsCopy.map((shipment) =>
        shipment.orderNo === orderNo
          ? { ...shipment, ...updatedShipment }
          : shipment
      )
    );
    updateShipment(orderNo, updatedShipment); //@Todo: use status; in case of error, don't update!
  };

  // Delete a shipment from the state

  const deleteShipment = (id: string) => {
    deleteRow(id);
    const shipmentsCopy = [...shipments];
    setShipments(shipmentsCopy.filter((row) => row.orderNo !== id));
  };

  // Define the context value that will be passed down to all children components
  const contextValue: ShipmentsState = {
    shipments,
    // addShipment,
    updateShipments,
    deleteShipment,
  };

  // Return the provider component with the context value
  return (
    <ShipmentsContext.Provider value={contextValue}>
      {isLoading ? (
        <div className="mt-5 pt-5 d-flex justify-content-center align-items-center">
          <Spinner animation="grow" role="status" />
        </div>
      ) : (
        <>{children}</>
      )}
    </ShipmentsContext.Provider>
  );
};

export const useShipments = () => useContext(ShipmentsContext);
