import { Route } from 'react-router-dom'
import Locations from './components/client/Locations'
import VendingMachine from './components/client/VendingMachine'
import Login from './components/admin/Login'
import Admin from './components/admin/Admin'
import CreateLocation from './components/admin/CreateLocation'
import CreateItem from './components/admin/CreateItem'

function App() {
  return (
    <>
      <Route exact path="/" component={Locations} />
      <Route exact path="/login" component={Login} />
      <Route path="/location/:location" component={VendingMachine} />
      <Route exact path="/admin" component={Admin} />
      <Route exact path="/admin/create-location" component={CreateLocation} />
      <Route exact path="/admin/create-item/:location" component={CreateItem} />

      {/* <Route
        path="/shop"
        render={(props) => <Shop cart={cart} setToCart={this.setToCart} />}
      /> */}
    </>
  )
}

export default App
