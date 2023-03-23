import axios from 'axios';
import { Shipment } from '../views/ShipmentsProvider';

const apiEndpoint = 'http://localhost:3000/shipments';

export const fetchData = async () => {
  try {
    const response = await axios.get(apiEndpoint);
    const data = response.data;
    if (response.status === 200) {
      return { data: data, status: response.status };
    }
    console.log('Status ', response.status);
  } catch (error) {
    console.log(error);
  }
};

export const deleteRow = async (id: string) => {
  try {
    const response = await axios.delete(`${apiEndpoint}/${id}`);
    console.log('Status ', response.status); // add response.data and use it to update in provider
    return { status: response.status };
  } catch (error) {
    console.log(error);
  }
};

export const updateShipment = async (id: string, data: Shipment) => {
  try {
    const response = await axios.put(`${apiEndpoint}/${id}`, data);
    console.log('Status ', response.status);
    return { status: response.status }; // add response.data and use it to update in provider
  } catch (error) {
    console.log('Error updating shipment:', error);
  }
};
