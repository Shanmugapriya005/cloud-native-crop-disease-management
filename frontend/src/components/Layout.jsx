import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-60 flex flex-col overflow-hidden">

        {/* Topbar */}
        <Topbar />

        <div className="flex-1 overflow-y-auto p-0">
          {children}
        </div>

      </div>

    </div>
  );
};

export default Layout;