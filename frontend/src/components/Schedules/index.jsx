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
      toast.error('Agendamento removido!', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
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
      if (booking.isCompleted === true) { // Devolve um toast baseado na situação da checkbox
        toast.error('Consulta espera conclusão!', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.success('Consulta concluída!', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
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
        toast.success('Observação adicionada!', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } catch (e) {
        toast.error(e.message);
      }
    } else {
      toast.error('Campo vazio!');
    }
  };
  // Construção da página
  return (
    <Table striped bordered size="sm">
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
        {bookings.length ? bookings.map((booking) => (
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
            <td className="checkboxinput">
              <input
                onChange={() => onCheckBooking(booking)}
                checked={booking.isCompleted}
                className="m-2 "
                type="checkbox"
              />
            </td>
            <td className="remove-button">
              <Button variant="outline-secondary" onClick={() => onClickRemove(booking)}>X</Button>
            </td>
          </tr>
        )) : (
          <tr>
            <td colSpan={6} align="center">
              Nenhum agendamento foi encontrado.
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BookingList;
