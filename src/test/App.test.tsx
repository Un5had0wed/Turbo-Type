import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // for toBeInTheDocument
import App from '../App';

// Mock SetWordlist
jest.mock('../assets/service/SetWordlist', () => ({
  __esModule: true,
  default: jest.fn(() => ['mocked', 'wordlist']),
}));

describe('App Component', () => {
  test('renders App component with Home page mode', () => {
    render(<App />);
    expect(screen.getByText('Typing Triumph Challenge')).toBeInTheDocument();
  });

  test('renders App component with Game page mode', () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.click(screen.getByText('Start Game'));
    expect(screen.getByText('SCORE BOARD')).toBeInTheDocument();
  });

  test('reducer sets page mode correctly', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByText('Start Game'));
    expect(container.firstChild).toMatchSnapshot(); // Check if component snapshot matches
  });

  test('reducer sets user name correctly', () => {
    const { container } = render(<App />);
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
      target: { value: 'John Doe' },
    });
    expect(container.firstChild).toMatchSnapshot();
  });

  test('reducer sets level and dFactor correctly', () => {
    const { container } = render(<App />);
    fireEvent.click(screen.getByText('Easy'), {
      target: { value: 'Medium' },
    });
    expect(container.firstChild).toMatchSnapshot();
  });
});
