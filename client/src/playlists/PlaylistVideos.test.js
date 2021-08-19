import React from "react";
import { render } from "@testing-library/react";
import PlaylistVideos from "./PlaylistVideos";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<PlaylistVideos/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <PlaylistVideos />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
