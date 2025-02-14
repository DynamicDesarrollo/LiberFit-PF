import React, { useEffect } from "react";
import Logo from "../../Atoms/Logo/Logo";
import Filter from "../../Molecules/Filter/Filter";
import Search from "./../../Atoms/Inputs/Search/Search";
import { useAppDispatch, useAppSelector } from "./../../../App/Hooks/Hooks";
import { Transition } from "@headlessui/react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import Item from "../../Atoms/SideItems/Item";
import Perfil from "../../Atoms/Perfil/Perfil";
import Items from "../../Atoms/Perfil/ItemsPefil/Items";
import Item2 from "../../Atoms/SideItems/Item2";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";
import Cookies from "universal-cookie";
import style from "./Style/sidebar.module.css";
import { useAuth0 } from "@auth0/auth0-react";
import { cerrarLogin, loginGoogle } from "../../../App/Action/Action";
import jwt_decode from "jwt-decode";

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
    const navigate = useNavigate();
    const cerrarSesion = () => {
        cookies.remove("id", { path: "/" });
        cookies.remove("email", { path: "/" });
        cookies.remove("name", { path: "/" });
        cookies.remove("phone", { path: "/" });
        cookies.remove("image", { path: "/" });
        cookies.remove("RolId", { path: "/" });
        cookies.remove("token",{path:"/"})
      
        if (cookies.get("loginWith") === "local") {
            dispatch(cerrarLogin());
            navigate("/login");
        } else logout();
        cookies.remove("loginWith", { path: "/" });
    };

    const client = [
        {
            title: "Dashboard",
            active: location.pathname === `/dashboard/${params.cliente}` ? true : false,
            desplegable: false,
            link: `/dashboard/${params.cliente}`,
        },
        {
            title: "Rutinas",
            active: location.pathname.includes("rutinas") ? true : false,
            desplegable: false,
            link: `/dashboard/${params.cliente}/rutinas`,
        },
        {
            title: "Ejercicios",
            active: location.pathname.includes("ejercicios") ? true : false,
            desplegable: false,
            link: `/dashboard/${params.cliente}/ejercicios`,
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
            active: location.pathname.includes("home") ? true : false,
            desplegable: false,
            link: "/dashboard/admin/home",
        },
        {
            title: "Empleados",
            active: location.pathname.includes("employees") ? true : false,
            desplegable: false,
            link: "/dashboard/admin/employees",
        },
        {
            title: "Productos",
            active: location.pathname.includes("Productos") ? true : false,
            desplegable: false,
            link: "/dashboard/admin/Products",
        },
        {
            title: "Ejercicios",
            active: location.pathname.includes("ejercicios") ? true : false,
            desplegable: false,
            link: "/dashboard/admin/ejercicios",
        },
        {
            title: "Clientes",
            active: location.pathname.includes("clients") ? true : false,
            desplegable: false,
            link: "/dashboard/admin/clients",
        },
    ];

    // console.log(cookies.get("id"));
    // console.log(cookies.get("name"));
    // console.log("-->",cookies.get("email"));
    // console.log("token--->", cookies.get("token"));
    // const usario = user
    
    const loginGoog = (user:any) => {
        if(user) {
            dispatch(loginGoogle({
                email: user?.email,
                password: user?.nickname,
                picture: user?.picture,
                name: user?.name
            }))
            .then(response => {
                return response?.data.token
                // console.log("-->",response?.data)
              })
              .then(response => {
                console.log(response)
                var respuesta = response
                var decode:any = jwt_decode(respuesta)
          
                // console.log("<--->",decode.user.email)
          
                cookies.set("id", decode.user.id,{path: "/"})
                cookies.set("email", decode.user.email,{path: "/"})
                cookies.set("name", decode.user.name,{path: "/"})
                cookies.set("phone", decode.user.phone,{path: "/"})
                cookies.set("image", decode.user.image,{path: "/"})
                cookies.set("RolId", decode.user.RolId,{path: "/"})
                cookies.set("loginWith","auth0",{path:"/"})
                cookies.set("token",respuesta,{path:"/"})

                    // alert(`Bienvenido ${decode.user.email}`)
                    // window.location.href="./home"
                    // logout()
                });
        }
    };
    useEffect(() => {
        loginGoog(user);
    }, [user]);
    // console.log({
    //     password: user?.nickname,
    //     email: user?.email,
    //     name: user?.name,
    //     picture: user?.picture
    // });
    // console.log("ibra-->",user)

    return (
        <div className=" flex  h-full w-sidebar flex-col justify-between fixed border-r border-redGray bg-white select-none overflow-y-auto">
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
                            {!dashboard && <Filter />}
                        </Transition>
                        {dashboard && (
                            <div className="mt-10 flex gap-2 flex-col">
                                {location.pathname.includes(
                                    `/dashboard/${params.cliente}`
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
                        <div className="w-max flex flex-row gaP-20">
                            <Link to={cookies.get("name") ? "" : "/login"}>
                                <Perfil
                                    width={
                                        cookies.get("name") || user?.name
                                            ? "14"
                                            : "14"
                                    }
                                />
                            </Link>
                            <div className="">
                                <Items />
                            </div>
                        </div>
                        {cookies.get("name") || user?.name ? (
                            <div
                                className="flex justify-end w-min"
                                onClick={() => {
                                    cerrarSesion();
                                }}
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
