import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const EventsReducer = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action) => {
      state.value = action.payload;
    },
    updateEvents: (state, action) => {
        state.value = action.payload;
    }
  },
})

export const getAllEvents = (state) => state.events.value;
// Action creators are generated for each case reducer function
export const { setEvents, updateEvents, incrementByAmount } = EventsReducer.actions;

export default EventsReducer.reducer;