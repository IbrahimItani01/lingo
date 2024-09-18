"use client";
import {Admin, Resource} from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";
import { CourseList } from "./course/list";
import { CourseCreate } from "./course/create";
import { CourseEdit } from "./course/edit";
import { UnitList } from "./unit/list";
import { UnitCreate } from "./unit/create";

const dataProvider= simpleRestProvider("/api");
const App=()=>{
    return(
    <Admin dataProvider={dataProvider}>
        <Resource
            name="courses"
            recordRepresentation="title"
            create={CourseCreate}
            edit= {CourseEdit}
            list={CourseList}
        />
        <Resource
            name="units"
            recordRepresentation="title"
            create={UnitCreate}
            edit= {CourseEdit}
            list={UnitList}
        />
    </Admin>
    );
};
export default App;