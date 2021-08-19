import React from "react";
import { render } from "@testing-library/react";
import FeaturedVideoDetail from "./FeaturedVideoDetail";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<FeaturedVideoDetail/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <FeaturedVideoDetail />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
