import { useEffect, useState } from 'react'

import config from '../../config.json'
import fire from '../../firebaseConfig'

const Locations = (l, index) => {
  return (
    <div key={index} className="pb-10 mb-10 border-b border-gray-300">
      <span className="font-bold">Location: {l.name}</span>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {l.items.map((i, index) => Item(i, index))}
      </div>
    </div>
  )
}

const Item = (item_, index) => {
  const { slug, name, image, price, quantity } = item_

  return (
    <div
      key={index}
      name={slug}
      className="border border-gray-300 rounded shadow-lg flex flex-col  hover:bg-gray-100"
    >
      <img alt={`item-${slug}`} src={image} className="rounded" />
      <div className="border-t border-gray-300 p-2">
        <div className="flex flex-col cursor-default">
          <span className="font-bold overflow-hidden overflow-ellipsis whitespace-nowrap">
            {name}
          </span>
          <div className="flex justify-between mt-1">
            <span className="text-sm whitespace-nowrap md:text-base">
              {price} THB
            </span>
            <span className="text-xs text-gray-400 self-center">{`(${quantity.remaining}/${quantity.total})`}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

const Admin = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch(`${config.HOST_SERVICE}`)
      const ls = await response.json()
      setLocations(ls)
    }

    fetchLocations()
  }, [])

  const logout = () => {
    fire
      .auth()
      .signOut()
      .then(function () {
        alert('Logout')
        window.location.assign('/login')
      })
      .catch(function (err) {
        console.error(`Signout Error: ${err}`)
      })
  }

  return (
    <div className="h-full w-9/12 mx-auto">
      <button
        className="absolute right-0 px-3 py-1 cursor-pointer font-thin"
        onClick={logout}
      >
        logout
      </button>
      <header className="text-center py-10">
        <h1 className="text-3xl font-bold md:text-4xl cursor-default">
          Admin Site
        </h1>
      </header>
      <div className="flex flex-col">
        {locations.map((l, index) => Locations(l, index))}
      </div>
    </div>
  )
}

export default Admin
