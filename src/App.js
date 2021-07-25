import { Route } from 'react-router-dom'
import Locations from './components/client/Locations'
import VendingMachine from './components/client/VendingMachine'
import Login from './components/admin/Login'
import Admin from './components/admin/Admin'

function App() {
  return (
    <>
      <Route exact path="/" component={Locations} />
      <Route exact path="/login" component={Login} />
      <Route path="/location/:location" component={VendingMachine} />
      <Route path="/admin" component={Admin} />

      {/* <Route
        path="/shop"
        render={(props) => <Shop cart={cart} setToCart={this.setToCart} />}
      /> */}
    </>
  )
}

export default App
