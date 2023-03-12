import axios from 'axios';
import { Shipment } from '../views/ShipmentsProvider';

const apiEndpoint = 'http://localhost:3000/shipments';

export const fetchData = async () => {
  //tee korda, error handling jne
  try {
    const result = await axios.get(apiEndpoint);
    const data = result.data;
    if (result.status === 200) {
      return data;
    } else {
      console.log(result.status);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRow = async (id: string) => {
  console.log(id);
  try {
    const result = await axios.delete(`${apiEndpoint}/${id}`);
    console.log(result.status);
    return result.status;
  } catch (error) {
    console.log(error);
  }
};

export const updateShipment = async (id: string, data: Shipment) => {
  try {
    const response = await axios.put(`${apiEndpoint}/${id}`, data);
    console.log(data, 'resp:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating shipment:', error);
    return null;
  }
};
