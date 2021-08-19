import React from "react";
import { render } from "@testimg-library/react";
import Videos from "./VideoList";

it("renders without crashing", function(){
    render(<Videos/>);
})

it("matches snapshot", function(){
    const { asFragment } = render(<Videos/>);
    expect(asFragment()).toMatchSnapshot();
});