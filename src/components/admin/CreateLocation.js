import { useState, useEffect } from 'react'

import config from '../../config.json'
import fire from '../../firebaseConfig'

const Input = ({ placeholder, name, state, fn }) => {
  const inputStyle = 'border rounded my-2 px-2 py-1 w-full'

  return (
    <div className="relative">
      <input
        className={inputStyle}
        onChange={(e) => fn({ ...state, [name]: e.target.value })}
      />
      <span className="absolute left-2 bg-white text-gray-500 px-1.5 text-xs">
        {placeholder}
      </span>
    </div>
  )
}

const CreateLocation = () => {
  const [locationInfo, setLocationInfo] = useState({})

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!!!user) {
        window.location.assign('/login')
      }
    })
  }, [])

  const inputField = [
    { placeholder: 'location name', name: 'locationName' },
    { placeholder: 'item name', name: 'itemName' },
    { placeholder: 'item image (url)', name: 'itemImage' },
    { placeholder: 'item price', name: 'itemPrice' },
    { placeholder: 'item quantity', name: 'itemQuantity' }
  ]

  const createLocation = async () => {
    const { locationName, itemName, itemImage, itemPrice, itemQuantity } =
      locationInfo
    const payload = {
      slug: locationName.toLowerCase(),
      name: locationName,
      items: [
        {
          slug: itemName.toLowerCase(),
          name: itemName,
          image: itemImage,
          price: itemPrice,
          quantity: { total: itemQuantity, remaining: itemQuantity }
        }
      ]
    }

    const response = await fetch(
      `${config.HOST_SERVICE}/admin/create-location`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      }
    )

    await response.json()
    window.location.assign('/admin')
  }

  return (
    <div className="h-full w-4/5 mx-auto py-10">
      <h1 className="font-bold text-2xl">Create Location</h1>
      <div className="mt-4">
        {inputField.map(({ placeholder, name }, index) => (
          <Input
            placeholder={placeholder}
            name={name}
            state={locationInfo}
            fn={setLocationInfo}
          />
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <a className="cursor-pointer" href="/admin">
          Cancle
        </a>
        <button
          className="bg-green-500 rounded px-4 py-2 font-bold text-white cursor-pointer"
          onClick={createLocation}
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default CreateLocation
