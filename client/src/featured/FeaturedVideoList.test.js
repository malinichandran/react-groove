import React from "react";
import { render } from "@testing-library/react";
import FeaturedVideoList from "./FeaturedVideoList";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<FeaturedVideoList/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <FeaturedVideoList />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
