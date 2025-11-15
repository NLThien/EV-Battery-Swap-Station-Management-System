import { Link } from "react-router-dom";

type NotFoundProps = {
  role?: "ADMIN" | "STAFF" | "GUEST"; // GUEST = chưa đăng nhập
};

function NotFound({ role = "GUEST" }: NotFoundProps) {
  let backPath = "/";
  let label = "Go back to Home";

  if (role === "ADMIN") {
    backPath = "/admin";
    label = "Go back to Admin Dashboard";
  } else if (role === "STAFF") {
    backPath = "/staff";
    label = "Go back to Staff Dashboard";
  }

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <Link
        to={backPath}
        style={{ color: "blue", textDecoration: "underline" }}
      >
        {label}
      </Link>
    </div>
  );
}

export default NotFound;
