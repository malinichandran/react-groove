import React from "react";
import { render } from "@testing-library/react";
import Playlists from "./ListOfPlaylists";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<Playlists/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <Playlists />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
