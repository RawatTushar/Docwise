import axios from 'axios';
import { BASE_URL, CLIENT_NAME } from "../../config/env";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
});

export const getToken = async (userName, password) => {
  try {
    const response = await axiosInstance.post('/api/Auth/Login', {
      userName,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('getToken error', error?.response || error.message);
    return null;
  }
};

export const getFacilityUserwise = async (userID, token) => {
  try {
    const response = await axiosInstance.post(
      '/api/MobiHISTree/GetFacilityUserwise',
      { operatorID: userID },
      { headers: { Authorization: `Bearer ${token}` } },
    );
    return response.data?.response || [];
  } catch (error) {
    console.error('getFacilityUserwise error', error?.response || error.message);
    return [];
  }
};
