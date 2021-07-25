import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import config from '../../config.json'
import fire from '../../firebaseConfig'

const Input = ({ placeholder, name, state, fn, idx }) => {
  const inputStyle = 'border rounded my-2 px-2 py-1 w-full'

  return (
    <div className="relative" key={idx}>
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

const CreateItem = () => {
  const [itemInfo, setItemInfo] = useState({})
  const { location } = useParams()

  useEffect(() => {
    fire.auth().onAuthStateChanged((user) => {
      if (!!!user) {
        window.location.assign('/login')
      }
    })
  }, [])

  const inputField = [
    { placeholder: 'item name', name: 'itemName' },
    { placeholder: 'item image (url)', name: 'itemImage' },
    { placeholder: 'item price', name: 'itemPrice' },
    { placeholder: 'item quantity', name: 'itemQuantity' }
  ]

  const addItem = async () => {
    const { itemName, itemImage, itemPrice, itemQuantity } = itemInfo

    const payload = {
      location,
      item: {
        slug: itemName.toLowerCase(),
        name: itemName,
        image: itemImage,
        price: itemPrice,
        quantity: { total: +itemQuantity, remaining: +itemQuantity }
      }
    }

    const response = await fetch(`${config.HOST_SERVICE}/admin/add-item`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    await response.json()
    window.location.assign('/admin')
  }

  return (
    <div className="h-full w-4/5 mx-auto py-10">
      <h1 className="font-bold text-2xl">Create new item</h1>
      <div className="mt-4">
        <div className="relative">
          <input
            className="border rounded my-2 px-2 py-1 w-full"
            disabled
            value={location}
          />
          <span className="absolute left-2 bg-white text-gray-500 px-1.5 text-xs">
            location name
          </span>
        </div>
        {inputField.map(({ placeholder, name }, index) => (
          <Input
            placeholder={placeholder}
            name={name}
            state={itemInfo}
            fn={setItemInfo}
            idx={index.toString()}
          />
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <a className="cursor-pointer" href="/admin">
          Cancle
        </a>
        <button
          className="bg-green-500 rounded px-4 py-2 font-bold text-white cursor-pointer"
          onClick={addItem}
        >
          Create
        </button>
      </div>
    </div>
  )
}

export default CreateItem
