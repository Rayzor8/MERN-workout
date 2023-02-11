import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <Box w="full" h="100vh" bg="gray.100">
      <BrowserRouter>
        <Navbar />
        <Box  px={{ base: 4,md:8, lg: 10 }} py="4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="users/*" element={<Users />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </Box>
  );
}

export default App;
