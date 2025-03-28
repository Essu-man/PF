import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Medication type
interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

// Define the state type
interface MedicationState {
  medications: Medication[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MedicationState = {
  medications: [],
  loading: false,
  error: null
};

// Create the slice
const medicationSlice = createSlice({
  name: 'medications',
  initialState,
  reducers: {
    addMedication: (state, action: PayloadAction<Medication>) => {
      state.medications.push(action.payload);
    },
    removeMedication: (state, action: PayloadAction<string>) => {
      state.medications = state.medications.filter(med => med.id !== action.payload);
    },
    setMedications: (state, action: PayloadAction<Medication[]>) => {
      state.medications = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});

// Export the actions and reducer
export const {
  addMedication,
  removeMedication,
  setMedications,
  setLoading,
  setError
} = medicationSlice.actions;

// Export the reducer as default
export default medicationSlice.reducer;