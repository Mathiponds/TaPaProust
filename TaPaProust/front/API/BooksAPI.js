import React from 'react'
import axios from 'axios';
const HOST = 'https://white-dingo-43.loca.lt'
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
  }),
  getBooks : (title, author, edition) =>
    instance({
      'method':'GET',
      'url':'/api/getBooks',
      'params' : {
        title : title,
        author : author,
        edition : edition
      }
  }),
  postBook : (title, author, edition, language, price, bookState) => {
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('author', author);
    bodyFormData.append('edition', edition);
    bodyFormData.append('state', bookState);
    bodyFormData.append('language', language);
    bodyFormData.append('price', price);
    instance({
      'method':'POST',
      'url':'/api/addBook',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })}
}
