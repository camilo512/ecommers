import { HashRouter, Routes, Route } from 'react-router-dom';
import { Products, Purchases, Shop, Home } from './pages';
import './App.css';
import LoadingScreen from './components/LoadingScreen';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';

function App() {

  const isLoading = useSelector(state => state.isLoading);

  return (
    <div className="App">
    <div className='header'></div>
  
  
      <HashRouter>

        { isLoading && <LoadingScreen />}
        <Navbar />
        
        <Routes>

          <Route path='/' element={<Home />}/>
          <Route path='/product/:id' element={<Products />}/>
          <Route path='/shop/:id'element={<Shop />} />
          <Route path='/purchases' element={<Purchases />}/>
          
        </Routes>
      </HashRouter>
       
      {/* <footer id="sticky-footer" class="flex-shrink-0 py-4 bg-dark text-white-50">
        <div class="container text-center">
         <small>Copyright &copy; Academlo 2022</small>
          <section class="mb-4 text-center"> 
   
    
            <a
              class="btn btn-outline-light btn-floating m-1"
              href="https://www.linkedin.com/in/juan-camilo-echeverri-florez-46268547/"
              role="button"
              target="blank">
              <i class="fab fa-linkedin-in"></i>
            </a>

          <a
           class="btn btn-outline-light btn-floating m-1"
           href="https://github.com/camilo512"
           target="blank"
           role="button"
           ><i class="fab fa-github"></i></a>

          <a
           class="btn btn-outline-light btn-floating m-1"
           href="https://www.youtube.com/c/academlo"
           target="blank"
           role="button"
           ><i class="fab fa-youtube"></i
          ></a>

      </section>
    </div>
  </footer> */}
    </div>
  );
}

export default App;
