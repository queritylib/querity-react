import React from "react";
import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { QuerityBuilderUI } from "./QuerityBuilderUI";

describe("QuerityBuilderUI", () => {
  it("renders correctly with default props", () => {
    render(<QuerityBuilderUI />);
    const inputElement = screen.getByTestId("querity-builder");
    expect(inputElement).toBeInTheDocument();
  });
});
