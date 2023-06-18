import React from "react";
import { Inter } from "next/font/google";

const fontLayout = Inter({ subsets: ["latin", "vietnamese"] });

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
