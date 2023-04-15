import React from "react";
import { Alexandria } from "next/font/google";

const fontLayout = Alexandria({ subsets: ["latin", "vietnamese"] });

interface DefaultLayoutProps {
  children?: React.ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className={fontLayout.className}>
      <header>Header</header>
      {children}
      <footer>Footer</footer>
    </div>
  );
};

export default DefaultLayout;
