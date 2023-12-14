import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Map from './pages/Map';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Test from './pages/Test';
import { ChakraProvider } from '@chakra-ui/react'
import customTheme from "./utils/themes";
import './index.css';

function App() {
    return (
      <ChakraProvider theme={customTheme}>
        <Router>
          <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/map" element={<Map />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contactus" element={<Contact />} />
              <Route path="/test" element={<Test />} />
            </Routes>
          <Footer />
        </Router>
      </ChakraProvider>
    );
  }

export default App;