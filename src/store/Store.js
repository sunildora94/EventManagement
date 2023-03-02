import { configureStore } from '@reduxjs/toolkit';
import EventsReducer from './EventsReducer';

export const store = configureStore({
  reducer: {events: EventsReducer},
})