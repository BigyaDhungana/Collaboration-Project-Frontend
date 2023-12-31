import { Inter } from "next/font/google";
import { Gluestackproviders } from "../context/Gluestackproviders";
import StyledJsxRegistry from "../context/registry";
import Usercontextcmp from "../context/userContext";
import { Reactqueryprovider } from "../context/reactQueryProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TaskSphere",
  description: "Collaborative platform",

};



export default function RootLayout({ children }) {
  return (
    <html lang="en" className="gs">
      <body className={inter.className}>
        <Usercontextcmp>
          <Reactqueryprovider>
            <Gluestackproviders>
              <StyledJsxRegistry>{children}</StyledJsxRegistry>
              <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </Gluestackproviders>
          </Reactqueryprovider>
        </Usercontextcmp>
      </body>
    </html>
  );
}
