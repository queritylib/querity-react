import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";
import { QuerityFieldProps } from "./QuerityField.types";
import { QuerityField } from "./QuerityField";

describe("QuerityField", () => {
  const defaultProps: QuerityFieldProps = {
    value: undefined,
    placeholder: "Enter query",
    className: "test-class",
    onChange: jest.fn(),
    onEnter: jest.fn(),
    onInvalidQuery: jest.fn(),
  };

  it("renders correctly with default props", () => {
    render(<QuerityField {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Enter query");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveClass("test-class");
    expect(inputElement).toBeValid();
  });

  it("renders with a predefined query", () => {
    render(<QuerityField {...defaultProps} value='lastName="Skywalker"' />);
    const inputElement = screen.getByPlaceholderText("Enter query");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue('lastName="Skywalker"');
  });

  it("calls onChange when the query changes", () => {
    render(<QuerityField {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Enter query");
    fireEvent.change(inputElement, {
      target: { value: 'lastName="Skywalker"' },
    });
    expect(defaultProps.onChange).toHaveBeenCalledWith('lastName="Skywalker"');
  });

  it("calls onEnter when Enter key is pressed and query is valid", () => {
    render(<QuerityField {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Enter query");
    fireEvent.change(inputElement, {
      target: { value: 'lastName="Skywalker"' },
    });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(defaultProps.onEnter).toHaveBeenCalledWith('lastName="Skywalker"');
  });

  it("input is valid when the query is valid", () => {
    render(<QuerityField {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Enter query");
    fireEvent.change(inputElement, {
      target: { value: 'lastName="Skywalker"' },
    });
    expect(inputElement).toBeValid();
  });

  it("input is invalid when the query is invalid", () => {
    render(<QuerityField {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Enter query");
    fireEvent.change(inputElement, { target: { value: "invalid query" } });
    expect(inputElement).toBeInvalid();
  });

  it("calls onInvalidQuery when Enter key is pressed and query is invalid", () => {
    window.alert = jest.fn();
    render(<QuerityField {...defaultProps} />);
    const inputElement = screen.getByPlaceholderText("Enter query");
    fireEvent.change(inputElement, { target: { value: "invalid query" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });
    expect(defaultProps.onInvalidQuery).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringMatching(
          "Syntax error at line .* - mismatched input .*"
        ),
      })
    );
  });
});
