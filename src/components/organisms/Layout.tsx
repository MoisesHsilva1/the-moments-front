import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <div className="flex flex-col w-full min-h-screen bg-black">
        <div className="flex-1 flex flex-col px-3 py-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
