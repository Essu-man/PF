export interface EggProduction {
    id?: string;
    date: Date;
    totalEggs: number;
    chickenHouseId?: string;
    notes?: string;
  }

  export interface EggProductionCreate {
    date: Date;
    totalEggs: number;
    chickenHouseId?: string;
  }