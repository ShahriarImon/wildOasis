import { ReactNode } from "react";
import SideNavigation from "../_components/SideNavigation";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="grid grid-cols-12 h-full gap-4">
      <div className="col-span-2 h-full">
        <SideNavigation />
      </div>
      <div className="col-span-10 py-2 h-full">{children}</div>
    </div>
  );
};

export default Layout;
