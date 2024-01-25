import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Form from "../components/Form";

describe("Form Component", () => {
  const mockSetAppState = jest.fn();

  const defaultProps = {
    appStates: {
      pageMode: "Home" as "Home" | "Game",
      userName: "",
      level: "Easy" as "Easy" | "Medium" | "Hard",
      dFactor: 1,
      randNum: 0,
    },
    setAppState: mockSetAppState,
  };

  test("renders Form component", () => {
    render(<Form {...defaultProps} />);
    expect(screen.getByText("Typing Triumph Challenge")).toBeInTheDocument();
  });

  test("submits form with non-empty username", () => {
    render(<Form {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "John Doe" },
    });

    fireEvent.submit(screen.getByRole("button", { name: "Start Game" }));

    expect(mockSetAppState).toHaveBeenCalledWith({
      type: "setName",
      payload: "John Doe",
    });
  });

  test("focuses on input on mount", () => {
    render(<Form {...defaultProps} />);
    expect(document.activeElement).toBe(
      screen.getByPlaceholderText("Enter your name")
    );
  });

  test("updates username in appStates on input change", () => {
    render(<Form {...defaultProps} />);

    fireEvent.change(screen.getByPlaceholderText("Enter your name"), {
      target: { value: "John Doe" },
    });

    expect(mockSetAppState).toHaveBeenCalledWith({
      type: "setName",
      payload: "John Doe",
    });
  });

  test("renders logo", () => {
    render(<Form {...defaultProps} />);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });
});
