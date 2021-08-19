import React from "react";
import { render } from "@testing-library/react";
import EditPlaylist from "./EditPlaylist";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<EditPlaylist/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <EditPlaylist />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
