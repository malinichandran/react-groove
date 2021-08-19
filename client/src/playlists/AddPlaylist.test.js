import React from "react";
import { render } from "@testing-library/react";
import AddPlaylist from "./AddPlaylist";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<AddPlaylist/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <AddPlaylist />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
