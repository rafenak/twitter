import "../src/assets/global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { Landing } from "./pages/Landing";
import { Theme } from "./utils/GlobalInterfaces";
import { LayoutPage } from "./pages/LayoutPage";
import { Feed } from "./features/feed/components/Feed/Feed";
import { Profile } from "./pages/Profile";
import { Client, over } from "stompjs";
import { useSelector } from "react-redux";
import { RootState } from "./redux/Store";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";

const theme: Theme = {
  colors: {
    blue: "#1DA1F2",
    black: "#14171A",
    darkGray: "#657786",
    gray: "#AAB8C2",
    lightGray: "#E1E8ED",
    white: "#F5F8FA",
    error: "red",
  },
};

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

export const App = () => {
  let stompClient: Client | null = null;
  const user = useSelector((state: RootState) => state.user.loggedIn);
  const [connected, setConnected] = useState<boolean>(false);

  function connect() {
    if (user) {
        const socket = new SockJS("http://localhost:8000/ws");
        stompClient = over(socket);

        stompClient.connect({}, onConnected, onError);
    }
}

function onConnected() {
  console.log("WebSocket connected");
  setConnected(true);

  if (stompClient) {
      const subscription = `/user/${user?.username}/notifications`;
      console.log(`Subscribing to: ${subscription}`);

      stompClient.subscribe(subscription, (message) => {
          try {
              const payload = JSON.parse(message.body);
              console.log("Message received:", payload);
              onMessageRecieved(payload);
          } catch (error) {
              console.error("Error parsing WebSocket message:", error);
          }
      });
  } else {
      console.error("stompClient is not initialized");
  }
}


  // function onConnected() {
  //   setConnected(true);
  //   if (stompClient) {
  //     stompClient?.subscribe(
  //       `/user/${user?.username}/notifications`,
  //       onMessageRecieved
  //     );
  //   }
  // }

 

  function onError() {
    setConnected(false);
  }

  function onMessageRecieved(payload: any) {
    console.log(payload);
  }

  useEffect(() => {
    if (user && !connected) {
      connect();
    }
  }, [user]);

  

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/" element={<Landing></Landing>} />
          <Route path="" element={<LayoutPage />}>
            <Route path="/home" element={<Feed />} />
            <Route path="/explore" element={<>Explore</>} />
            <Route path="/:username" element={<Profile />} />
          </Route>
          {/* <Route path="/home" element={<Home></Home>} /> */}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};
