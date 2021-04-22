/* eslint-disable no-underscore-dangle */
import React, { useContext } from 'react';
import { Table, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { format, parseISO } from 'date-fns';
import scheduleContext, { Types } from '../../ScheduleContext';
import axios from '../../utils/api';

const BookingList = () => {
  // Utilização do hook useContext concomitantemente com o useReducer
  const [{ bookings }, dispatch] = useContext(scheduleContext);

  // Função utilizada para deletar um agendamento
  const onClickRemove = async (booking) => {
    try {
      await axios.delete(`/booking/${booking._id}`);
      toast.error('Agendamento removido!');
    } catch (e) {
      toast.error(e.message);
    }
    dispatch({ type: Types.DELETE_BOOKING, payload: booking });
  };

  // Função feita para informar da conclusão de uma consulta, baseado em valores booleanos
  const onCheckBooking = async (booking) => {
    try {
      await axios.put(`/booking/${booking._id}`, {
        isCompleted: !booking.isCompleted,
      });
      toast.success('Consulta concluída!');
    } catch (e) {
      toast.error(e.message);
    }
    dispatch({
      type: booking.isCompleted ? 'UNDO_BOOKING' : 'DO_BOOKING',
      payload: booking,
    });
  };

  // Controle do input TextArea
  const onChangeText = (event, booking) => {
    dispatch({
      type: Types.SET_TEXT,
      payload: {
        event: event.target.value,
        value: booking,
      },
    });
  };

  // Submit do input TextArea quando sair do foco do usuário
  const onBlurField = async (booking) => {
    if (booking.obs.trim()) {
      try {
        await axios.put(`/booking/${booking._id}`, {
          ...booking,
        });
        toast.success('Observação adicionada!');
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error('Campo vazio!');
    }
  };
  // Construção da página
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
              {format(parseISO(booking.bookday), 'dd/MM/yyyy')}
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
