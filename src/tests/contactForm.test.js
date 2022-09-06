import { act, fireEvent, render, screen } from "@testing-library/react";
import ContactForm from "../components/contactForm";

describe("<App />", () => {
  it("should render the contact form fields", () => {
    render(<ContactForm />);
    expect(screen.getByTestId("firstName")).toBeInTheDocument();
    expect(screen.getByTestId("lastName")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  it("validate user inputs, and provides error messages", async () => {
    const { getByTestId, getByText } = render(<ContactForm />);

    await act(async () => {
      fireEvent.change(screen.getByTestId("firstName"), {
        target: { value: "" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId("lastName"), {
        target: { value: "" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId("email"), {
        target: { value: "" },
      });
    });

    await act(async () => {
      fireEvent.change(screen.getByTestId("message"), {
        target: { value: "" },
      });
    });

    await act(async () => {
      fireEvent.submit(getByTestId("form"));
    });

    const errorMessage = screen.getAllByText(/This is required/i);
    expect(errorMessage).toHaveLength(4);
  });
});
