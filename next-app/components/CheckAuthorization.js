import { signIn, useSession } from "next-auth/react";

export default function CheckAuthorization({ children }) {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="row">
        <div className="col-lg-10 col-offset-1">
          <p>
            Hey There, looks like you reached an area you don't have access to.
          </p>

          <p>Please sign in here.</p>

          <p>
            <button className="btn btn-secondary" onClick={() => signIn()}>
              Sign in
            </button>
          </p>
        </div>
      </div>
    );
  }

  return children;
}
