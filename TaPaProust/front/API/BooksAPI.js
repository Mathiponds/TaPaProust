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
  postBook : (book) => {
    console.log(book)
    var bodyFormData = new FormData();
    bodyFormData.append('title', book.title);
    bodyFormData.append('author', book.author);
    bodyFormData.append('edition', book.edition);
    bodyFormData.append('state', book.state);
    bodyFormData.append('language', book.language);
    bodyFormData.append('price', book.price);
    return instance({
      'method':'POST',
      'url':'/api/addBook',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })},
  modifyBook : (book) => {
    var bodyFormData = new FormData();
    bodyFormData.append('bookId', book.id)
    bodyFormData.append('title', book.title);
    bodyFormData.append('author', book.author);
    bodyFormData.append('edition', book.edition);
    bodyFormData.append('state', book.state);
    bodyFormData.append('language', book.language);
    bodyFormData.append('price', book.price);
    return instance({
      'method':'POST',
      'url':'/api/modifyBook',
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

  bookSold : (bookId, token) => {
    var bodyFormData = new FormData();
    bodyFormData.append('bookId', bookId);
    bodyFormData.append('token', token);
    return instance({
      'method':'POST',
      'url':'/api/bookSold',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })},
  bookUnsold : (bookId, token) => {
    var bodyFormData = new FormData();
    bodyFormData.append('bookId', bookId);
    bodyFormData.append('token', token);
    return instance({
      'method':'POST',
      'url':'/api/bookUnsold',
      'data' : bodyFormData,
      'headers' : { 'content-type':'multipart/form-data'}
  })},
}
