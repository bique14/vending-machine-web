import { useEffect, useState } from 'react'

import config from '../../config.json'
import fire from '../../firebaseConfig'

const Locations = (l, index, onRemoveItem, onRestock, onForceOutOfStock) => {
  return (
    <div key={index} className="pb-10 mb-10 border-b border-gray-300">
      <div className="flex justify-between mb-4">
        <span className="font-bold">Location: {l.name}</span>
        <button className="bg-blue-500 rounded font-bold text-white px-2 py-1 text-sm hover:bg-blue-600">
          + new item
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {l.items.map((i, index) =>
          Item(i, l.slug, index, onRemoveItem, onRestock, onForceOutOfStock)
        )}
      </div>
    </div>
  )
}

const Item = (
  item_,
  locationSlug,
  index,
  onRemoveItem,
  onRestock,
  onForceOutOfStock
) => {
  const { slug, name, image, price, quantity } = item_

  return (
    <div
      key={index}
      name={slug}
      className="border border-gray-300 rounded shadow-lg flex flex-col  hover:bg-gray-100"
    >
      <div className="relative">
        <img alt={`item-${slug}`} src={image} className="rounded" />
        <button
          className="rounded-full bg-red-500 px-1.5 text-white right-1 top-1 absolute"
          onClick={() => onRemoveItem(locationSlug, slug)}
        >
          X
        </button>
      </div>
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
        <div className="flex justify-between gap-x-2 mt-2">
          <button
            className="rounded flex-1 bg-green-500 font-bold text-sm px-2 py-1"
            onClick={() => onRestock(locationSlug, slug)}
          >
            RESTOCK
          </button>
          <button
            className="rounded flex-1 bg-yellow-500 font-bold text-sm px-2 py-1"
            onClick={() => onForceOutOfStock(locationSlug, slug)}
          >
            OUT OF STOCK
          </button>
        </div>
      </div>
    </div>
  )
}

const Admin = () => {
  const [locations, setLocations] = useState([])

  useEffect(() => {
    async function fetchLocations() {
      const response = await fetch(`${config.HOST_SERVICE_DEV}`)
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

  const removeItem = async (locationSlug, itemSlug) => {
    const response = await fetch(
      `${config.HOST_SERVICE_DEV}/admin/remove-item`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: locationSlug,
          item: itemSlug
        })
      }
    )

    await response.json()
    window.location.reload(false)
  }

  const restockItem = async (locationSlug, itemSlug) => {
    const response = await fetch(`${config.HOST_SERVICE_DEV}/admin/restock`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        location: locationSlug,
        item: itemSlug
      })
    })

    await response.json()
    window.location.reload(false)
  }

  const forceOutOfStock = async (locationSlug, itemSlug) => {
    const response = await fetch(
      `${config.HOST_SERVICE_DEV}/admin/force-out-of-stock`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          location: locationSlug,
          item: itemSlug
        })
      }
    )

    await response.json()
    window.location.reload(false)
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
        <div className="flex justify-end mb-4">
          <button className="bg-green-500 rounded font-bold text-white px-3 py-1 hover:bg-green-600">
            + new location
          </button>
        </div>
        {locations.map((l, index) =>
          Locations(l, index, removeItem, restockItem, forceOutOfStock)
        )}
      </div>
    </div>
  )
}

export default Admin
