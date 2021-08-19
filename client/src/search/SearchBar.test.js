import React from "react";
import { render } from "@testimg-library/react";
import Search from "./SearchBar";

it("renders without crashing", function(){
    render(<Search/>);
})

it("matches snapshot", function(){
    const { asFragment } = render(<Search/>);
    expect(asFragment()).toMatchSnapshot();
});