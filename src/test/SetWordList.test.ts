import SetWordlist from "../assets/service/SetWordlist";

// Mock the dictionary import
jest.mock('../assets/service/dictionary.json', () => [
    'hell',
    'bell',
    'cell',
    'apple',
    'banana',
    'orange',
    'elephant',
    'giraffe',
    'programming',
    'react',
  ]);

describe('SetWordlist Function', () => {
  test('returns easy word list', () => {
    const result = SetWordlist('Easy');
    expect(result).toEqual(['hell', 'bell', 'cell']);
  });

  test('returns medium word list', () => {
    const result = SetWordlist('Medium');
    expect(result).toEqual(['apple','banana','orange','elephant','giraffe','react']);
  });

  test('returns hard word list', () => {
    const result = SetWordlist('Hard');
    expect(result).toEqual(['programming']);
  });

  test('returns an empty array for an invalid level', () => {
    const result = SetWordlist('InvalidLevel');
    expect(result).toEqual([]);
  });

  test('returns an empty array for an empty string level', () => {
    const result = SetWordlist('');
    expect(result).toEqual([]);
  });
});
