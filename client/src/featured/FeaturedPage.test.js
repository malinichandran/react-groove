import React from "react";
import { render } from "@testing-library/react";
import FeaturedPage from "./FeaturedPage";
import { MemoryRouter } from "react-router";

it("renders without crashing", function(){
    render(<FeaturedPage/>);
});

it("matches snapshot", function () {
  const { asFragment } = render(
      <MemoryRouter>
        <FeaturedPage />
      </MemoryRouter>,
  );
  expect(asFragment()).toMatchSnapshot();
});
