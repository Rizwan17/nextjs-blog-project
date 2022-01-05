import Head from "next/head";
import Header from "../Header";
import { useEffect } from "react";
import { useStore } from "../../client/context";
import { getValue } from "../../utils/common";
import { getSession } from "next-auth/client";
import { authConstants } from "../../client/context/constants";

const Layout  = ({
    children
}) => {

    const [state, dispatch] = useStore();

    useEffect(async () => {
        const authenticated = getValue(state, ["user", "authenticated"], false);
        if(!authenticated){
            console.log('layout => ', authenticated);
            dispatch({ type: authConstants.LOGIN_REQUEST });
            const session = await getSession();
            if(session){
                dispatch({
                    type: authConstants.LOGIN_SUCCESS,
                    payload: session
                });
            }else{
                dispatch({
                    type: authConstants.LOGIN_FAILURE,
                    payload: session
                });
            }
        }

    }, []);

    return (
        <>
            <Head>
                {/* <!-- Bootstrap core CSS --> */}
                <link href="https://getbootstrap.com/docs/5.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous" />
                {/* <!-- Custom styles for this template --> */}
                <link href="https://fonts.googleapis.com/css?family=Playfair&#43;Display:700,900&amp;display=swap" rel="stylesheet" />
            </Head>
            <Header />
            {children}
        </>
    );
}

export default Layout;