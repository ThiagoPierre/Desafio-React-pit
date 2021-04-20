/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-assign */
import React, { useState, useEffect } from 'react';
import {
  Container, Table, Button,
} from 'react-bootstrap';
import axios from '../../utils/api';

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const fetchBookings = async () => { // Pega dados da api
    try {
      const response = await axios.get('http://localhost:3636/api/booking');
      setBookings(response.data);
    } catch (e) {
      console.log('Não foi possível recuperar os dados!');
    }
  };

  useEffect(() => { // Os dados da api são coletados sempre que a página é inicializada
    fetchBookings();
  }, []);

  // Controlador individual para as áreas de texto, evitando o uso de vários states
  const onChangeText = (event, index) => {
    const newBookings = bookings.map((booking, bookingIndex) => {
      if (bookingIndex === index) {
        return {
          ...booking,
          obs: event.target.value,
        };
      }

      return booking;
    });

    setBookings(newBookings);
  };
  // Controlador do checkbox da aplicação
  const checkComplete = async ({ target: { checked } }, booking) => {
    // Controla o checkbox na parte do front
    const newbookings = bookings.map((bookingTemp) => {
      if (bookingTemp._id === booking._id) {
        return {
          ...bookingTemp,
          isCompleted: checked,
        };
      }
      return bookingTemp;
    });
    // Passa as informações se está checked ou não para a API
    try {
      await axios.put(`http://localhost:3636/api/booking/${booking._id}`, {
        bookday: booking.bookday,
        isCompleted: checked,
      });
      setBookings(newbookings);
    } catch (e) {
      console.log('Não foi possível utilizar o método PUT');
    }
  };
  // Salva as informações do campo de observações na API
  const onBlurField = async (booking) => {
    if (booking.obs.trim()) {
      try {
        await axios.put(`http://localhost:3636/api/booking/${booking._id}`, {
          ...booking,
          edit: false,
        });
      } catch (e) {
        console.log('Não foi possível utilizar o método PUT');
      }

      onChangeText(booking);
    } else {
      console.log('Não foi possível utilizar o método PUT');
    }
  };

  // Controlador para deletar algum agendamento, tanto pelo front quanto pelo back
  const deleteBooking = async (booking) => {
    const newBookings = bookings.filter(({ _id }) => _id !== booking._id);

    try {
      await axios.delete(`http://localhost:3636/api/booking/${booking._id}`);
      setBookings(newBookings);
    } catch (e) {
      console.log('Não foi removido!');
    }
  };
  return (

    <Container>
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
          {bookings.map((booking, index) => (
            <tr className={booking.isCompleted ? 'completed' : ''}>
              <td>
                {booking.bookday}
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
                  onChange={(event) => onChangeText(event, index)}
                />
              </td>
              <td>
                <input
                  onChange={(event) => checkComplete(event, booking)}
                  checked={booking.isCompleted}
                  className="m-2"
                  type="checkbox"
                />
              </td>
              <td>
                <Button onClick={() => deleteBooking(booking)}>X</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BookingList;
