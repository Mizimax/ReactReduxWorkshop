import axios from 'axios'

const initialState = {
  addFood: false,
  agreeTerms: false,
  email: '',
  username: '',
  ticketType: '',
  countdown: '',
  loading: false,
  message: ''
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.key]: action.value
      }
    case 'SUBMIT_PENDING':
      return {
        ...state,
        loading: true
      }
    case 'SUBMIT_FULFILLED':
    case 'SUBMIT_REJECTED':
      return {
        ...state,
        loading: false,
        message: action.payload.data.status
      }
    default:
      return state
  }
}

export const setField = (key, value) => ({
  type: 'SET_FIELD',
  key: key,
  value: value
})

export const submitForm = data => ({
  type: 'SUBMIT',
  payload: axios.get('http://www.mocky.io/v2/5aeec5962f00005800739b2c')
})
