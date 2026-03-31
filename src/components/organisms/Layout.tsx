import { Outlet } from 'react-router-dom';
import SideBar from '../molecules/SideBar';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import Header from './Header';

const Layout = () => {
  return (
    <SidebarProvider>
      <div className="flex w-full min-h-screen bg-black text-white">
        <SideBar variant="inset" />

        <SidebarInset className="flex w-full flex-col bg-black">
          <Header />

          <main className="flex flex-1 flex-col p-4 pt-20 md:pt-4 max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Layout;
