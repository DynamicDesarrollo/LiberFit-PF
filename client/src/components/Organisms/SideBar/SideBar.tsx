import React from "react";
import Logo from "../../Atoms/Logo/Logo";
import Filter from "../../Molecules/Filter/Filter";
import Search from "./../../Atoms/Inputs/Search/Search";
import { useAppDispatch, useAppSelector } from "./../../../App/Hooks/Hooks";
import { Transition } from "@headlessui/react";
import { useParams, Link, useLocation } from "react-router-dom";
import Item from "../../Atoms/SideItems/Item";
import Perfil from "../../Atoms/Perfil/Perfil";
import Items from "../../Atoms/Perfil/ItemsPefil/Items";
import Item2 from "../../Atoms/SideItems/Item2";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Cookies from "universal-cookie";
import style from "./Style/sidebar.module.css";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
    handle: any;
    setName: any;
    dashboard: boolean;
}

function SideBar({ handle, setName, dashboard }: Props) {
    const cookies = new Cookies();
    const params = useParams();
    const location = useLocation();
    
    const dispatch = useAppDispatch();
    const { filter } = useAppSelector((state) => state);
    const { user, logout } = useAuth0();
    const cerrarSesion = () => {
        cookies.remove("id", { path: "/" });
        cookies.remove("email", { path: "/" });
        cookies.remove("name", { path: "/" });
        cookies.remove("phone", { path: "/" });
        cookies.remove("image", { path: "/" });
        window.location.href = "./home";
    };

    const client = [
        {
            title: "Dashboard",
            active: location.pathname === "/dashboard/cliente" ? true : false,
            desplegable: false,
            link: "/dashboard/cliente",
        },
        {
            title: "Rutinas",
            active: location.pathname.includes("rutinas") ? true : false,
            desplegable: false,
            link: "/dashboard/cliente/rutinas",
        },
        {
            title: "Ejercicios",
            active: location.pathname.includes("ejercicios") ? true : false,
            desplegable: false,
            link: "/dashboard/cliente/ejercicios",
        },
        {
            title: "Membresia",
            active: false,
            desplegable: true,
            link: "",
        },
    ];

    const admin = [
        {
            title: "Dashboard",
            active: true,
            desplegable: false,
            link: "/dashboard/admin/home",
        },
        {
            title: "Empleados",
            active: false,
            desplegable: false,
            link: "/dashboard/admin/employees",
        },
        {
            title: "Productos",
            active: false,
            desplegable: false,
            link: "/dashboard/admin/productos",
        },
        {
            title: "Ejercicios",
            active: false,
            desplegable: false,
            link: "/dashboard/admin/ejercicios",
        },
        {
            title: "Clientes",
            active: false,
            desplegable: false,
            link: "/dashboard/admin/clients",
        },
    ];

    // console.log(cookies.get("id"));
    // console.log(cookies.get("name"));
    // console.log(cookies.get("email"));
    // console.log(cookies.get("image"));
    // console.log(JSON.stringify(user));

    return (
        <div className="flex min-h-screen h-full w-sidebar flex-col justify-between border-r border-redGray bg-white select-none overflow-y-auto">
            <div className="">
                <Transition
                    show={filter.open === false ? true : false}
                    enter="transform transition duration-[450ms]"
                    enterFrom="opacity-0 transition ease-in"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                >
                    {filter.open ? null : (
                        <div className="mt-5 ml-5">
                            <Logo />
                        </div>
                    )}
                </Transition>
                <div
                    className={`w-max h-full flex items-center flex-col mt-28 ${
                        filter.open ? "mt-2" : null
                    }`}
                >
                    {!dashboard && (
                        <div className="mb-10">
                            <form onSubmit={handle}>
                                <Search
                                    Placeholder="Search"
                                    setName={setName}
                                    style={{}}
                                />
                            </form>
                        </div>
                    )}
                    <div className="w-full overflow-y-visible h-full">
                        <Transition
                            show={
                                params.name
                                    ? false
                                    : params.category
                                    ? true
                                    : false
                            }
                            enter="transform transition duration-[450ms]"
                            enterFrom="opacity-0 transition ease-in"
                            enterTo="opacity-100 rotate-0 scale-100"
                            leave="transform duration-200 transition ease-in-out"
                            leaveFrom="opacity-100 rotate-0 scale-100 "
                            leaveTo="opacity-0 "
                        >
                            <Filter />
                        </Transition>
                        {dashboard && (
                            <div className="mt-10 flex gap-2 flex-col">
                                {location.pathname.includes(
                                    "/dashboard/cliente"
                                )
                                    ? client.map((d) => (
                                        <div className="">
                                            {d.desplegable ? (
                                                <Link to={d.link}>
                                                    <Item
                                                        title={d.title}
                                                        type="cliente"
                                                    />
                                                </Link>
                                            ) : (
                                                <Link to={d.link}>
                                                    <Item2
                                                        active={d.active}
                                                        title={d.title}
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                    ))
                                   : location.pathname.includes("/dashboard/admin")
                                    ? admin.map((d) => (
                                        <div className="">
                                            {d.desplegable ? (
                                                <Link to={d.link}>
                                                    <Item
                                                        title={d.title}
                                                        type="admin"
                                                    />
                                                </Link>
                                            ) : (
                                                <Link to={d.link}>
                                                    <Item2
                                                        active={d.active}
                                                        title={d.title}
                                                    />{" "}
                                                </Link>
                                            )}
                                        </div>
                                    ))
                                    : null}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {!dashboard && (
                <Transition
                    show={filter.open === false ? true : false}
                    enter="transform transition duration-[400ms]"
                    enterFrom="opacity-0 transition ease-in"
                    enterTo="opacity-100 rotate-0 scale-100"
                    leave="transform duration-200 transition ease-in-out"
                    leaveFrom="opacity-100 rotate-0 scale-100 "
                    leaveTo="opacity-0 scale-95 "
                >
                    <div className="border-t border-redGray w-max h-73 flex">
                        <div className="w-max flex flex-row">
                            <Link to={cookies.get("name") ? "" : "/login"}>
                                <Perfil width={cookies.get('name') || user?.name ? "15" : "14"} />
                            </Link>
                            <Items />
                        </div>
                        {cookies.get("name") || user?.name ? (
                            <div
                                className="flex justify-end w-max"
                                onClick={() => logout()}
                            >
                                <ArrowLeftOnRectangleIcon className="w-8 mr-5 cursor-pointer text-redClare justify-end" />
                            </div>
                        ) : null}
                    </div>
                </Transition>
            )}
        </div>
    );
}

export default SideBar;
