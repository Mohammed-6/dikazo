import Header from "./header";
import Footer from "./footer";

interface layoutProps {
  children: React.ReactNode;
}
const Layout = (props: layoutProps) => {
  return (
    <>
      <Header />
      <div className="py-4 min-h-screen">{props.children}</div>
      <Footer />
    </>
  );
};

export default Layout;
