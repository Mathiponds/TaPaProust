const HOST = '192.168.1.7'
const HOST_WITH_PORT = 'http://${HOST}:3000';


export default function getBooks() {
  const url = 'http://localhost:8080'
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.error(error))
}
