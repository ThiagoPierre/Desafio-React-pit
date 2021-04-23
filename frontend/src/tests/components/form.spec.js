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

    const input = getByLabelText("Nome");
    fireEvent.blur(input);

    await waitFor(() => {
      expect(getByTestId("nameError")).not.toBe(null);
      expect(getByTestId("nameError")).toHaveTextContent("Campo Obrigatório");
    });
  });
});
