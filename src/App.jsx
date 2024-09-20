import { Header } from "./modules/Header.jsx"
import { Main } from "./modules/Main.jsx"
import { Footer } from "./modules/Footer.jsx"
import { BrowserRouter } from "react-router-dom"



function App() {

  // роутинг подклчили Router 
  return (
     <BrowserRouter>  
        <Header />

        <Main />

        <Footer />
    </BrowserRouter>
  )
}

export default App
