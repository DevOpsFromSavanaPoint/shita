import { IOrder } from './../interfaces/interfaces';
const axios = require('axios');
interface ShitaSDKI {
    apiKey: any;
    apiUrl: string;
}
class ShitaSDK implements ShitaSDKI {
  
  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.apiUrl = 'https://shita-api.com';
  }
    apiKey: any;
    apiUrl: string;

  async createOrder(orderData: IOrder) {
   
    try {
      const response = await axios.post(`${this.apiUrl}/orders`, orderData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async getOrder(orderId) {
    try {
      const response = await axios.get(`${this.apiUrl}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async updateOrder(orderId, orderData) {
    try {
      const response = await axios.put(`${this.apiUrl}/orders/${orderId}`, orderData, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }

  async cancelOrder(orderId) {
    try {
      const response = await axios.delete(`${this.apiUrl}/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${this.apiKey}`
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
}

export { ShitaSDK };
