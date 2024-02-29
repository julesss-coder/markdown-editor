import { Outlet, NavLink } from "react-router-dom";

const RootLayout = () => {
  // State with current files goes here
  const files = ["file 1", "file 2", "file 3"];

  return (
    <>
      {/* Navbar */}
      <div className="root-layout">
        {/* This nav goes inside the Sider */}
        <header>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/new">New file</NavLink>

            {/* Does this work? */}
            {files.map((file, index) => (
              <NavLink to={`/${index}`}>{file}</NavLink>
            ))}
          </nav>
        </header>
      </div>

      {/* Content outlet, next to Sider */}
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;