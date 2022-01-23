import React from "react";

import { signIn, useSession, signOut } from "next-auth/react";
import jwt_decode from "jwt-decode";

export default function CheckAuthorization({ children }) {
  const { data: session } = useSession();
  const [parsed, setParsed] = React.useState();
  const [loading, setLoading] = React.useState();
  const [data, setData] = React.useState();

  console.log("session = ", session);
  if (session?.idToken) {
    console.log("decoded id = ", jwt_decode(session?.idToken));
  }

  if (session?.accessToken) {
    console.log("decoded access = ", jwt_decode(session?.accessToken));
  }

  React.useEffect(() => {
    if (session?.accessToken) {
      setLoading(true);
      fetch("api/auth/okta/identity")
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [session]);

  if (loading) return <div>...loading</div>;
  if (!session) {
    return (
      <div className="row">
        <div className="col-lg-10 col-offset-1">
          <p>
            Hey There, looks like you reached an area you don't have access to.
          </p>

          <p>Please sign in here.</p>

          <p>
            <button className="btn btn-secondary" onClick={signIn}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    );
  }

  return children;
}
