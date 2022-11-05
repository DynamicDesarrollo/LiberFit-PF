import React from "react";
import NavBar from "../../Organisms/Navbar/NavBar";
import SideBar from "./../../Organisms/SideBar/SideBar";
import CreateForm from "../../Organisms/CreateForm/CreateForm";
import { useParams } from "react-router-dom";
import Cliente from './../../Organisms/DashboardSections/Cliente/Cliente';
import DashAdmin from '../../Organisms/DashboardSections/Admin/DashAdmin';

function DashboardTemplate() {
    const { cliente } = useParams<{ cliente: string }>();
    const { admin } = useParams<{ admin: string }>();
    return (
        <div className="flex flex-row select-none">
            <div className="z-20">
                <SideBar handle={false} setName={false} dashboard={true} />
            </div>
            <div className="flex flex-col ">
            <div className="justify-start  z-10 w-screen">
                <NavBar dashboard={true} />
            </div>
            <div className="z-0 ml-sidebar flex justify-center flex-col">
                    {cliente ? <Cliente/> : null}
                    {admin ? <DashAdmin /> : null}
                </div>
            </div>
            
            
        </div>
    );
}

export default DashboardTemplate;
