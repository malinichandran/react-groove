import React from "react";
import { render } from "@testing-library/react";
import DeleteProfile from "./DeleteProfilePage";
import { MemoryRouter, Route} from "react-router-dom";
import { UserProvider } from "../testUtils";

it("renders without crashing", function(){
    render(
        <MemoryRouter>
            <UserProvider>
                <DeleteProfile/>
            </UserProvider>
        </MemoryRouter>
    );
});

it("matched snapshot", function(){
    const { asFragment } = render(
        <MemoryRouter >
            <UserProvider>
                <Route path="/deleteprofile">
                    <DeleteProfile/>
                </Route>
            </UserProvider>
        </MemoryRouter>
    );
    expect(asFragment()).toMatchSnapshot();
});