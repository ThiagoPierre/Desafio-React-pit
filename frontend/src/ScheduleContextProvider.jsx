import React, { useEffect, useReducer } from 'react';
import ScheduleContext, { BookingReducer, initialState, Types } from './ScheduleContext';
import axios from './utils/api';

const ScheduleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(BookingReducer, initialState);

  const getBookingData = async () => {
    const response = await axios.get('/booking');

    dispatch({ type: Types.SET_BOOKING, payload: response.data });
  };
  useEffect(() => {
    getBookingData();
  }, []);

  return (
    <ScheduleContext.Provider value={[state, dispatch]}>
      {children}
    </ScheduleContext.Provider>
  );
};
export default ScheduleContextProvider;
