import axios from 'axios';
import { dRow } from '../components/Table';


const apiEndpoint = 'http://localhost:3000/shipments';

export const fetchData = async () => {
  //tee korda, error handling jne
  try {
    const result = await axios.get(apiEndpoint);
    const data = result.data;
    if (result.status === 200) {
      return data;
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteRow = async ( id: string ) => {
  console.log(id);
  try {
    const result = await axios.delete(
      `${apiEndpoint}/?orderNo=${id}`
    );
    return result.status;
  } catch (error) {
    console.log(error);
  }
};

export const updateShipment = async (id:string, data:dRow) => {
  try {
    const response = await axios.put(`${apiEndpoint}/?orderNo=${id}`, JSON.stringify(data));
    return response.data;
  } catch (error) {
    console.error('Error updating shipment:', error);
    return null;
  }
};
