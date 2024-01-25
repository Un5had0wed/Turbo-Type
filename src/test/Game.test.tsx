import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Game from '../components/Game';

jest.mock('../assets/service/SetWordlist', () => ({
  __esModule: true,
  default: jest.fn(() => ['word1', 'word2', 'word3']),
}));

describe('Game Component', () => {
  const mockSetGBState = jest.fn();

  const defaultProps = {
    gbStates: {
      difficulty: 'Easy' as 'Easy'|'Medium'|'Hard',
      dFactor: 1,
      wordList: ['word1', 'word2', 'word3'],
      randWord: 'WORD',
      gameInput: '',
      gameOn: true,
      wordTimer: 4, // Adjust the time based on your actual timer duration
      curScore: {
        scoreTimer: 0,
        scoreDisplay: '',
      },
      topScore: {
        scoreTimer: 0,
        scoreDisplay: "",
        gameNo: "",
      },
      allScores: [],
    },
    setGBState: mockSetGBState,
    restart: jest.fn(),
    quit: jest.fn(),
  };

  test('renders Game component', () => {
    render(<Game {...defaultProps} />);
    // Add more specific assertions based on your component structure
    expect(screen.getByText('W')).toBeInTheDocument();
    expect(screen.getByText('O')).toBeInTheDocument();
    expect(screen.getByText('R')).toBeInTheDocument();
    expect(screen.getByText('D')).toBeInTheDocument();
  });

  test('focuses on input on mount', () => {
    render(<Game {...defaultProps} />);
    expect(document.activeElement).toBe(screen.getByRole('textbox'));
  });

  test('calls setGBState with correct actions on correct input', () => {
    render(<Game {...defaultProps} />);

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'WORD' } });

    expect(mockSetGBState).toHaveBeenCalledWith({ type: 'setGameInput', payload: 'WORD' });
    expect(mockSetGBState).toHaveBeenCalledWith({ type: 'incrementDifficulty', payload: 0.01 });
    expect(mockSetGBState).toHaveBeenCalledWith({ type: 'setWord' });
    expect(mockSetGBState).toHaveBeenCalledWith({ type: 'setGameInput', payload: '' });
  });
});
