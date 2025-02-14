import React from "react";
import style from "./items.module.css";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function Items() {
    const cookies = new Cookies();
    const { user } = useAuth0();
    return (
        <div className="flex h-full items-center ml-4">
            <div className="flex flex-col">
                {cookies.get("name") || user?.name ? (
                    <div className="">
                        <p className={`${style.textI} text-gray`}>
                            {cookies.get("name") || user?.name}
                        </p>
                    </div>
                ) : (
                    <div className="">
                        <p className={`${style.text} text-gray`}>Guest</p>
                        <Link to="/signup">
                            <p className={`${style.text2} text-semiRed`}>
                                Register
                            </p>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Items;
