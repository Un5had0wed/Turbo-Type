import { render, screen } from "@testing-library/react";
import App from "../App";

test("Form being rendered on rendering app for the first time", () => {
  render(<App />);
  const title = screen.getByText("Turbo Type");
  expect(title).toBeInTheDocument();
});
