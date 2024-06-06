import "./App.css";
import { Layout, Flex } from "antd";
import MyList from "./components/MyList";
const { Header, Content } = Layout;

function App() {
  const layoutStyle = {
    overflow: "hidden",
  };
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 48,
    lineHeight: "64px",
    backgroundColor: "#4096ff",
  };

  const contentStyle: React.CSSProperties = {
    textAlign: "center",
    minHeight: 120,
    color: "#fff",
    padding: "120px 100px",
    backgroundColor: "#fff",
  };

  return (
    <div className="App">
      <Flex gap="middle" wrap>
        <Layout style={layoutStyle}>
          <Header style={headerStyle}>任务列表</Header>
          <Content style={contentStyle}>
            <MyList />
          </Content>
        </Layout>
      </Flex>
    </div>
  );
}

export default App;
