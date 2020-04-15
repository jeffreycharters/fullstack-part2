import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const create = (personObject) => {
    const request = axios.post(baseURL, personObject)
    return request.then(response => response.data)
}

const update = (person, newNumber) => {
    const changedPerson = { ...person, number: newNumber }
    const request = axios.put(`${baseURL}/${person.id}`, changedPerson)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { create, update, remove }