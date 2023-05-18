
import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';

const App = () => {


  const Shop = () => {
    return(
      <div>
        <h1>This Is The Shop</h1>
      </div>
    )
  }

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop' element={<Shop />} />
      </Route>
    

    </Routes> 

  )
}

export default App;