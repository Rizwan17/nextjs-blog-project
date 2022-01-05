import { signout } from "next-auth/client";
import Link from "next/link";
import { useStore } from "../../client/context";
import { authConstants } from "../../client/context/constants";
import { getValue } from "../../utils/common";

const Header = (props) => {
  const [state, dispatch] = useStore();
  const user = getValue(state, ["user"], null);
  const authenticated = getValue(state, ["user", "authenticated"], false);

  return (
    <div className="container">
      <header className="blog-header py-3">
        <div className="row flex-nowrap justify-content-between align-items-center">
          <div className="col-4 pt-1">
            {authenticated ? (
              <Link href={`/profile`}>
                <a className="link-secondary" href="#">
                  {user.name}
                </a>
              </Link>
            ) : (
              <Link href={`/`}>
                <a className="link-secondary" href="#">
                  Welcome Guest
                </a>
              </Link>
            )}
          </div>
          <div className="col-4 text-center">
            <Link href={`/`}>
              <a className="blog-header-logo text-dark" href="#">
                NEWSX
              </a>
            </Link>
          </div>
          <div className="col-4 d-flex justify-content-end align-items-center">
            <a className="link-secondary" href="#" aria-label="Search">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="mx-3"
                role="img"
                viewBox="0 0 24 24"
              >
                <title>Search</title>
                <circle cx="10.5" cy="10.5" r="7.5" />
                <path d="M21 21l-5.2-5.2" />
              </svg>
            </a>
            {authenticated ? (
              
                <a
                  className="btn btn-sm btn-outline-secondary"
                  href="#"
                  onClick={() => {
                    signout({
                      redirect: false
                    }).then(result => {
                      dispatch({
                        type: authConstants.LOGIN_FAILURE
                      });
                    })
                  }}
                >
                  Logout
                </a>
            ) : (
              <>
                <Link href={`/signup`}>
                  <a
                    className="btn btn-sm btn-outline-secondary user-login-btn"
                    href="#"
                  >
                    Sign up
                  </a>
                </Link>
                <Link href={`/login`}>
                  <a
                    className="btn btn-sm btn-outline-secondary user-login-btn"
                    href="#"
                  >
                    Sign in
                  </a>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <style jsx>
        {`
          .bd-placeholder-img {
            font-size: 1.125rem;
            text-anchor: middle;
            -webkit-user-select: none;
            -moz-user-select: none;
            user-select: none;
          }

          @media (min-width: 768px) {
            .bd-placeholder-img-lg {
              font-size: 3.5rem;
            }
          }
          .user-login-btn {
            margin: 0 5px;
          }
        `}
      </style>
    </div>
  );
};

export default Header;
