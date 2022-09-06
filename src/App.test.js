import { render, screen } from "@testing-library/react";
import App from "./App";
import ContactForm from "./components/contactForm";

describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    render(<App />);
    expect(screen.getByText("Contact App")).toBeInTheDocument();
  });

  it("Renders <ContactForm /> component", async () => {
    render(<ContactForm />);
    expect(screen.getByText("Contact Form")).toBeInTheDocument();
  });
});
