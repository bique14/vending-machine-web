import { Route } from 'react-router-dom'
import Locations from './components/client/Locations'
import VendingMachine from './components/client/VendingMachine'

function App() {
  return (
    <>
      <Route exact path="/" component={Locations} />
      <Route path="/:location" component={VendingMachine} />

      {/* <Route
        path="/shop"
        render={(props) => <Shop cart={cart} setToCart={this.setToCart} />}
      /> */}
    </>
  )
}

export default App
