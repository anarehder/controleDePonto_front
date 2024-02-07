import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import SummaryPage from "./pages/SummaryPage";
import RegistryPage from "./pages/RegistryPage";
import ReportPage from "./pages/ReportPage";
import UserProvider from "./contexts/UserContext";
import SummaryPageAdmin from "./pages/SummaryPageAdmin";
import CreateUserPage from "./pages/CreateUserPage";
import ChangePassword from "./pages/ChangePasswordPage";

function App() {

  return (
    <AppContainer>
      <BrowserRouter>
        <UserProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/adminsummary" element={<SummaryPageAdmin />} />
            <Route path="/password" element={<ChangePassword />} />
            <Route path="/createuser" element={<CreateUserPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/registry" element={<RegistryPage />} />
            <Route path="/report" element={<ReportPage />} />
          </Routes>
        </UserProvider>
      </BrowserRouter >
    </AppContainer >
  )
}

export default App

const AppContainer = styled.main`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`