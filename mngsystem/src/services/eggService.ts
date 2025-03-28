import axios from 'axios';
import { EggProduction, EggProductionCreate } from '../types/Egg';

const API_URL = 'http://your-backend-url/api/eggs';

export const eggService = {
  async logEggProduction(data: EggProductionCreate): Promise<EggProduction> {
    try {
      const response = await axios.post<EggProduction>(API_URL, data);
      return response.data;
    } catch (error) {
      console.error('Error logging egg production', error);
      throw error;
    }
  },

  async getDailyEggProduction(startDate: Date, endDate: Date): Promise<EggProduction[]> {
    try {
      const response = await axios.get<EggProduction[]>(API_URL, {
        params: { startDate, endDate }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching egg production', error);
      throw error;
    }
  }
};