/* eslint-env jest */
import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../SearchForm';

test('Impossible to send empty form', () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).toBeDisabled();
});

test('Allows sending if data is valid', () => {
    const onSearch = jest.fn();
    render(<SearchForm onSearch={onSearch} />);
    fireEvent.change(screen.getByPlaceholderText(/from/i), { target: { value: 'Moscow', name: 'originSkyName' }});
    fireEvent.change(screen.getByPlaceholderText(/to/i), { target: { value: 'Paris', name: 'destinationSkyName' }});
    fireEvent.change(screen.getByPlaceholderText(/date/i), { target: { value: '2025-05-01', name: 'date' }});
    // эмулируем выбор пассажиров через handlePassengerSubmit если требуется
    // ...
    const button = screen.getByRole('button', { name: /search/i });
    expect(button).not.toBeDisabled();
});