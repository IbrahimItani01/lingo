"use client";
import {Admin} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

const dataProvider= simpleRestProvider("/api");
const App=()=>{
    return(
    <Admin dataProvider={dataProvider}>
        Admin
    </Admin>
    );
};
export default App;