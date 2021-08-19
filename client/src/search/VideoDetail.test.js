import React from "react";
import { render} from "@testing-library/react";
import Video from "./VideoDetail";
import { MemoryRouter } from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <Video/>
            </UserProvider>
        </MemoryRouter>
    );
});

it("matches snapshot", function(){
    const { asFragment } = render(
        <MemoryRouter>
            <UserProvider>
                <Video/>
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});