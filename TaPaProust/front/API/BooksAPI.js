import React from 'react'
import axios from 'axios';
const HOST = 'https://tapaproust.herokuapp.com'
const instance = axios.create({
  baseURL: HOST,
  headers : { 'content-type':'application/json' // override instance defaults
        },
})

export default  {
  login : (username, password) => {
    var bodyFormData = new FormData();
    bodyFormData.append('username', username);
    bodyFormData.append('password', password);
    return instance({
      'method':'POST',
      'url':'/login',
      'data' : bodyFormData,
      'headers' : {'content-type':'multipart/form-data'}
  })},
  logout : () => {
    return instance({
      'method':'POST',
      'url':'/logout',
  })},
  register : (mail, pwd, pwdConfirmation, phone) => {
    var bodyFormData = new FormData();
    bodyFormData.append('mail', mail);
    bodyFormData.append('pwd', pwd);
    bodyFormData.append('pwdConfirmation', pwdConfirmation);
    bodyFormData.append('phone', phone);
    return instance({
      'method':'POST',
      'url':'/register',
      'data' : bodyFormData,
      'headers' : {'content-type':'multipart/form-data'}
  })},
  getAllBooks : () =>
    instance({
      'method':'GET',
      'url':'/api/getAllBooks'
  }),
  getMyBooks : () =>
    instance({
      'method':'GET',
      'url':'/api/getMyBooks'
  }),
  getBooks : (title, author, edition) =>
    instance({
      'method':'GET',
      'url':'/api/getBooks',
      'params' : {
        title : title,
        author : author,
        edition : edition
      },
      'headers' : { 'content-type':'application/octet-stream' // override instance defaults
            }
  }),
  postBook : (title, author, edition, language, price, bookState, photos) => {
    var bodyFormData = new FormData();
    bodyFormData.append('title', title);
    bodyFormData.append('author', author);
    bodyFormData.append('edition', edition);
    bodyFormData.append('state', bookState);
    bodyFormData.append('language', language);
    bodyFormData.append('price', price);
    bodyFormData.append('photos', photos);
    return instance({
      'method':'POST',
      'url':'/api/addBook',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })},
  modifyBook : (id, title, author, edition, language, price, bookState, photos) => {
    var bodyFormData = new FormData();
    bodyFormData.append('bookId', id)
    bodyFormData.append('title', title);
    bodyFormData.append('author', author);
    bodyFormData.append('edition', edition);
    bodyFormData.append('state', bookState);
    bodyFormData.append('language', language);
    bodyFormData.append('price', price);
    bodyFormData.append('photos', photos);
    return instance({
      'method':'POST',
      'url':'/api/modifyBook',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })},
  sendArray : (ls) => {
    var bodyFormData = new FormData();
    bodyFormData.append('ls', ls)
    console.log("e")
    return instance({
      'method':'POST',
      'url':'/sendArray',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })},

  addUser : (mail, password, passwordBis, phone) => {
    var bodyFormData = new FormData();
    bodyFormData.append('mail', mail)
    bodyFormData.append('password', password);
    bodyFormData.append('passwordBis', passwordBis);
    bodyFormData.append('phone', phone);
    return instance({
      'method':'POST',
      'url':'/api/addUser',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
    })},

  addToFav : (bookId) => {
    var bodyFormData = new FormData();
    bodyFormData.append('bookId', bookId);
    return instance({
      'method':'POST',
      'url':'/api/addToFav',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })},
  removeFromFav : (bookId) => {
    var bodyFormData = new FormData();
    bodyFormData.append('bookId', bookId);
    return instance({
      'method':'POST',
      'url':'/api/removeFromFav',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })},
  getMyFavBooks : () =>
    instance({
      'method':'GET',
      'url':'/api/getMyFavBooks'
  }),
  getImage : (path) =>
    instance({
      'method':'GET',
      'url':'/api/getImage?path='+path,
      'headers' : { 'content-type':'application/octet-stream' // override instance defaults
            }
  }),
}
