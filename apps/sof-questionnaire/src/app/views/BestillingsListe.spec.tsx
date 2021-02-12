import React from "react";
import {render} from "@testing-library/react";
import BestillingsListe from "./BestillingsListe";


test("should render bestillingsliste",()=>{
    const {getByTestId} = render(<BestillingsListe/>)
    const component = getByTestId("tst123")
    expect(component).toBeDefined()
})
