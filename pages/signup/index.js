import { useEffect, useState } from "react";
import { signup } from "../../client/request";
import { useRouter } from "next/router";
import { getValue } from "../../utils/common";
import { useStore } from "../../client/context";
import Loader from "../../components/Loader";

const Signup = (props) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const router = useRouter();
  const [state, ] = useStore();
  const user = getValue(state, ["user"], null);

  const signupHandler = async (e) => {
    e.preventDefault();

    const payload = { name, email, password };
    const result = await signup(payload);
    //console.log({ result });
    if(result.hasError){
      setErrorMessage(result.errorMessage);
    }else{
      setErrorMessage(null);
      setName('');
      setEmail('');
      setPassword('');
      console.log(result);
      router.replace(`/login`);
    }

  }
  
  if(user && user.authenticating){
    return <Loader />
  }

  if(user && user.authenticated){
    router.replace(`/`);
    return null;
  }

  return (
    <main className="form-signin">
      <form style={{
          margin: '50px 0'
      }}
      onSubmit={signupHandler}
      >
        
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        {
          errorMessage && (
            <p style={{ textTransform: 'capitalize', color: 'red' }}>{errorMessage}</p>
          )
        }

        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="floatingInput"
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label ht="floatingInput">Name</label>
        </div>
        <div className="form-floating">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label ht="floatingInput">Email address</label>
        </div>
        <div className="form-floating">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label ht="floatingPassword">Password</label>
        </div>
        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
      </form>
    </main>
  );
};

// export const getServerSideProps = (ctx) => {
//   // ctx provides req object and req object provides cookie and cookie provides token
// }

export default Signup;
