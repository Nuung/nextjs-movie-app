import NavBar from "./NavBar/NavBar";

const Layout = ({ children }) => {
    return (
        <>
            <NavBar />
            <div>
                {children}
            </div>
        </>
    );
};

export default Layout;