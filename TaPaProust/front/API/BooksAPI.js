import React from 'react'
import axios from 'axios';
const HOST = 'https://weak-badger-37.loca.lt'
const instance = axios.create({
  baseURL: HOST,
  headers : { 'content-type':'application/json' // override instance defaults
        },
})

export default  {
  getAllBooks : () =>
    instance({
      'method':'GET',
      'url':'/api/getAllBooks',
  })
}
