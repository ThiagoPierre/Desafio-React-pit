/* eslint-disable quotes */

/* eslint-disable no-undef */
import React from 'react';
import {
  render, waitFor, fireEvent,
} from '@testing-library/react';
import Forms from '../../components/Form/index';

describe('Renders', () => {
  it('renders form without crashing', () => {
    render(<Forms />);
  });

  it('should show validation on blur', async () => {
    const { getByLabelText, getByTestId } = render(<Forms />);

    const nameinput = getByLabelText("Nome");
    const dateinput = getByLabelText("Hora da consulta");
    fireEvent.blur(nameinput, dateinput);

    await waitFor(() => {
      expect(getByTestId("nameError")).not.toBe(null);
      expect(getByTestId("nameError")).toHaveTextContent("Campo Obrigatório");
    });
  });
});

/* jest.mock("react-datepicker", () => (props) => (
  <input
    data-testid="mockedDateField"
    onChange={() => { props.onChange("asdfasd"); }}
  />
));

test("should remove date error as we select date", async () => {
  const { getByText, getAllByTestId, queryByTestId } = render(<Forms />);
  const button = getByText("Agendar");
  fireEvent.click(button);

  const mockedDateField = getAllByTestId("mockedDateField");
  fireEvent.input(mockedDateField, { target: { value: new Date() } });
  await waitFor(() => {
    expect(queryByTestId("dateError")).toBe(null);
  });
}); */
