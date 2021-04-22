/* eslint-disable no-underscore-dangle */
import { createContext } from 'react';

const scheduleContext = createContext();

const initialState = {
  bookings: [],
};

const Types = {
  SET_BOOKING: 'SET_BOOKING',
  DELETE_BOOKING: 'DELETE_BOOKING',
  SET_TEXT: 'SET_TEXT',
};

const BookingReducer = (state, action) => {
  switch (action.type) {
    case Types.SET_BOOKING: {
      return {
        ...state,
        bookings: action.payload,
      };
    }
    case Types.DELETE_BOOKING: {
      const booking = action.payload;
      const bookings = [...state.bookings];
      const newBookings = bookings.filter(({ _id }) => _id !== booking._id);
      return {
        bookings: newBookings,
      };
    }
    case Types.SET_TEXT: {
      const newValue = action.payload.event;
      const booking = action.payload.value;
      const bookings = [...state.bookings];
      const newBookings = bookings.map((bookingTemp) => {
        if (bookingTemp._id === booking._id) {
          return {
            ...bookingTemp,
            obs: newValue,
          };
        }
        return bookingTemp;
      });
      return {
        bookings: newBookings,
      };
    }
    case 'DO_BOOKING': {
      const booking = action.payload;
      const bookings = [...state.bookings];
      const newbookings = bookings.map((bookingTemp) => {
        if (bookingTemp._id === booking._id) {
          return { ...bookingTemp, isCompleted: true };
        }
        return bookingTemp;
      });
      return {
        bookings: newbookings,
      };
    }
    case 'UNDO_BOOKING': {
      const booking = action.payload;
      const bookings = [...state.bookings];
      const newbookings = bookings.map((bookingTemp) => {
        if (bookingTemp._id === booking._id) {
          return { ...bookingTemp, isCompleted: false };
        }
        return bookingTemp;
      });
      return {
        bookings: newbookings,
      };
    }
    default: {
      return state;
    }
  }
};

export { initialState, Types, BookingReducer };

export default scheduleContext;
