import { BrowserRouter, Routes, Route } from "react-router-dom";
import styled from 'styled-components'
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import SummaryPage from "./pages/SummaryPage";
import RegistryPage from "./pages/RegistryPage";

function App() {

  return (
    <AppContainer>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/summary" element={<SummaryPage />} />
            <Route path="/registry" element={<RegistryPage />} />
          </Routes>
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