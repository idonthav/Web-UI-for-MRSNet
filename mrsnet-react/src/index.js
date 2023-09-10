import { Layout, Menu } from "antd";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter, Navigate, Route,
  Routes, useLocation, useNavigate
} from "react-router-dom";
import "./index.css";
import Basic from "./pages/basic";
import Benchmark from "./pages/benchmark";
import Generate from "./pages/generate";
import Login from "./pages/login";
import Quantify from "./pages/quantify";
import Simulate from "./pages/simulate";
import Train from "./pages/train";
const { Header, Content, Footer } = Layout;

const NavbarMenu = () => {
  const Navigate = useNavigate();
  const Loaction = useLocation();

  return (
    <Menu
      style={{ width: "100%" }}
      theme="dark"
      onSelect={(v) => {
        Navigate(v.item.props.path);
      }}
      mode="horizontal"
      defaultSelectedKeys={[Loaction.pathname]}
      items={[
        {
          key: "/benchmark",
          label: "Benchmark",
          path: "/benchmark",
        },
        {
          key: "/quantify",
          label: "Quantify",
          path: "/quantify",
        },
        {
          key: "/simulate",
          label: "Simulate",
          path: "/simulate",
        },
        {
          key: "/train",
          label: "Train",
          path: "/train",
        },
        {
          key: "logout",
          label: "Logout",
          path: "/logout",
        },
      ]}
    />
  );
};

function App() {
  const [authenticated, setAuthenticated] = React.useState(false); 
  return (
    <BrowserRouter>
      {authenticated ? (
        <Layout className="layout">
          <Header style={{ display: "flex", alignItems: "center" }}>
            <div className="demo-logo">
              <img
                src="/logo192.png"
                alt="logo"
                style={{
                  width: 40,
                  display: "block",
                  marginRight: 20,
                }}
              />
            </div>
            <NavbarMenu />
          </Header>
          <Content style={{ padding: 10 }}>
            <Routes>
              <Route path="/" element={<Navigate to={"/benchmark"} />}></Route>
              <Route path="/benchmark" element={<Benchmark />}></Route>
              <Route path="/quantify" element={<Quantify />}></Route>
              <Route path="/simulate" element={<Simulate />}></Route>
              <Route path="/train" element={<Train />}></Route>
              <Route path="/basic" element={<Basic />}></Route>
              <Route path="/generate" element={<Generate />}></Route>
              <Route
                path="/logout"
                element={<Login setAuthenticated={setAuthenticated} />}
              ></Route>
            </Routes>
          </Content>
          <Footer>
            <p style={{ textAlign: "center" }}>
              &copy;MRSNET React Application
            </p>
          </Footer>
        </Layout>
      ) : (
        <Routes location={"/login"}>
          <Route
            path="/login"
            element={<Login setAuthenticated={setAuthenticated} />}
          ></Route>
        </Routes>
      )}
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
