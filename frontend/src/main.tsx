import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@/components/theme-provider";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "unfonts.css";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { UserChatRoomsContextProvider } from "./contexts/UserChatRoomsContext.tsx";
import { ChatRoomContextProvider } from "./contexts/ChatRoomContext.tsx";
import { SocketContextProvider } from "./contexts/SocketContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <AuthContextProvider>
          <SocketContextProvider>
            <UserChatRoomsContextProvider>
              <ChatRoomContextProvider>
                <App />
              </ChatRoomContextProvider>
            </UserChatRoomsContextProvider>
          </SocketContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);
