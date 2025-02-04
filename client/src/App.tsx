import { BrowserRouter, Routes, Route } from "react-router-dom";


import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signIn' element={<SignIn />} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
