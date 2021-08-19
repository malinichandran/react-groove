import React from "react";
import { render } from "@testing-library/react";
import FeaturedVideoItem from "./FeaturedVideoItem";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<FeaturedVideoItem/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <FeaturedVideoItem />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
