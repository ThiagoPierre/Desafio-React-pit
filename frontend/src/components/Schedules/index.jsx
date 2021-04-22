/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import scheduleContext, { Types } from '../../ScheduleContext';
import axios from '../../utils/api';

const BookingList = () => {
  // eslint-disable-next-line no-unused-vars
  const [{ bookings }, dispatch] = useContext(scheduleContext);

  const onClickRemove = async (booking) => {
    try {
      await axios.delete(`/booking/${booking._id}`);
      toast.success('Agendamento removido!');
    } catch (e) {
      toast.error(e.message);
    }
    dispatch({ type: Types.DELETE_BOOKING, payload: booking });
  };

  const onCheckBooking = async (booking) => {
    try {
      await axios.put(`/booking/${booking._id}`, {
        isCompleted: !booking.isCompleted,
      });
      toast.success('Agendamento concluído!');
    } catch (e) {
      toast.error(e.message);
    }
    dispatch({
      type: booking.isCompleted ? 'UNDO_BOOKING' : 'DO_BOOKING',
      payload: booking,
    });
  };

  const onChangeText = (event, booking) => {
    dispatch({
      type: Types.SET_TEXT,
      payload: {
        event: event.target.value,
        value: booking,
      },
    });
  };
  const onBlurField = async (booking) => {
    if (booking.obs.trim()) {
      try {
        await axios.put(`/booking/${booking._id}`, {
          ...booking,
        });
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error('Campo vazio!');
    }
  };
  return (
    <Table striped bordered>
      <thead>
        <tr>
          <th>Agendamento</th>
          <th>Hora</th>
          <th>Nome</th>
          <th>Observações</th>
          <th>Concluído</th>
          <th>Remover</th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking) => (
          <tr key={booking._id} className={booking.isCompleted ? 'completed' : ''}>
            <td>
              {format(parseISO(booking.birthday), 'dd/MM/yyyy')}
            </td>
            <td>
              {booking.hour}
            </td>
            <td>
              {booking.name}
            </td>
            <td>
              <textarea
                onBlur={() => onBlurField(booking)}
                value={booking.obs}
                onChange={(event) => onChangeText(event, booking)}
              />
            </td>
            <td>
              <input
                onChange={() => onCheckBooking(booking)}
                checked={booking.isCompleted}
                className="m-2"
                type="checkbox"
              />
            </td>
            <td>
              <Button onClick={() => onClickRemove(booking)}>X</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BookingList;
