import React from "react";
import { render } from "@testing-library/react";
import PlaylistVideo from "./PlayingPlaylistVideo";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<PlaylistVideo/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <PlaylistVideo />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
