import { render, screen, fireEvent, describe, test, expect } from "@testing-library/react";
import UnverifiedRating from "./UnverifiedRating";

describe("UnverifiedRating", () => {
  test("renders the component", () => {
    render(<UnverifiedRating feedbackData={1} />);
    
    // Assert that the component renders without throwing any errors
    expect(screen.getByText("Rating Form")).toBeInTheDocument();
  });

  test("opens and closes the dialog", () => {
    render(<UnverifiedRating feedbackData={1} />);
    
    // Assert that the dialog is initially closed
    expect(screen.queryByText("Rating Form")).not.toBeInTheDocument();

    // Click the button to open the dialog
    fireEvent.click(screen.getByAltText("thumpUp"));

    // Assert that the dialog is now open
    expect(screen.getByText("Rating Form")).toBeInTheDocument();

    // Click the close button to close the dialog
    fireEvent.click(screen.getByAltText("close img"));

    // Assert that the dialog is now closed
    expect(screen.queryByText("Rating Form")).not.toBeInTheDocument();
  });

  test("submits the rating", () => {
    render(<UnverifiedRating feedbackData={1} />);
    
    // Click the button to open the dialog
    fireEvent.click(screen.getByAltText("thumpUp"));

    // Enter values in the input fields
    fireEvent.change(screen.getByLabelText("Rating:"), { target: { value: 5 } });
    fireEvent.change(screen.getByLabelText("Feedback:"), { target: { value: "Great job!" } });
    fireEvent.change(screen.getByLabelText("Correct Translation:"), { target: { value: "Hello" } });

    // Click the submit button
    fireEvent.click(screen.getByText("Submit"));

    // Assert that the rating is submitted successfully
    expect(screen.getByText("Rating submitted successfully")).toBeInTheDocument();
  });
});