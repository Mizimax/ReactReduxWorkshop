import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import logo from './logo.svg'
import './App.css'

import { setField, submitForm } from './reducer'

import Input from './Input'

const targetDate = moment('2018-5-6 17:00:00')

class App extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.interval = setInterval(this.updateCountDown, 1000)
    this.updateCountDown()
  }
  componentWillUnmount() {
    //unsubscribe
    clearInterval(this.interval)
  }
  updateCountDown = () => {
    const duration = moment.duration(targetDate.diff(moment()))
    const hour = Math.floor(duration.asHours())
    const minute = duration.minutes()
    const second = duration.seconds()
    this.props.setField(
      'countdown',
      `${hour} hours ${minute} minutes ${second} seconds`
    )
  }
  render() {
    const {
      email,
      username,
      ticketType,
      agreeTerms,
      addFood,
      countdown,
      setField,
      loading,
      message
    } = this.props
    return (
      <div className="container">
        <div className="padding-top" align="center">
          Ticket sale ends in {countdown}
        </div>
        <div className="card margin-top padding-30">
          <h1 className="title is-3" align="center">
            Evenn Register Form
          </h1>
          <form
            onSubmit={e => {
              this.props.submitForm()
              e.preventDefault()
            }}
          >
            <Input
              title="Email"
              type="email"
              placeholder="Email Input"
              icon="fa-envelope"
              value={email}
              onChange={email => setField('email', email)}
              required={true}
            />
            <Input
              title="Username"
              type="text"
              placeholder="Username Input"
              icon="fa-user"
              value={username}
              onChange={username => setField('username', username)}
            />
            <div className="field">
              <label className="label">Subject</label>
              <div className="control">
                <div className="select">
                  <select
                    value={ticketType}
                    onChange={e => setField('ticketType', e.target.value)}
                  >
                    <option>Select dropdown</option>
                    <option value="React">React Workshop</option>
                    <option value="Vue">Vue Workshop</option>
                    <option value="Angular">Angular Workshop</option>
                    <option value="Polymer">Polymer Workshop</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="checkbox">
                  <input
                    className="margin-right-10"
                    type="checkbox"
                    checked={agreeTerms}
                    onClick={e => setField('agreeTerms', !agreeTerms)}
                  />
                  I agree to the <a href="#">terms and conditions</a>
                </label>
              </div>
            </div>

            <div className="field">
              <div className="control">
                <label className="radio">
                  <input
                    className="margin-right-10"
                    type="radio"
                    name="question"
                    checked={addFood}
                    onChange={e => setField('addFood', true)}
                  />
                  Yes ( + 50 THB )
                </label>
                <label className="radio">
                  <input
                    className="margin-right-10"
                    type="radio"
                    name="question"
                    checked={!addFood}
                    onChange={e => setField('addFood', false)}
                  />
                  No
                </label>
              </div>
            </div>

            <div className="field is-grouped">
              <div className="control">
                <button
                  type="submit"
                  className="button is-link"
                  disabled={loading}
                >
                  {loading ? 'Loading...' : message ? 'Success !' : 'Submit'}
                </button>
              </div>
              <div className="control">
                <button className="button is-text">Cancel</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  email: state.email,
  username: state.username,
  agreeTerms: state.agreeTerms,
  ticketType: state.ticketType,
  addFood: state.addFood,
  loading: state.loading,
  message: state.message,
  countdown: state.countdown
})

// const mapDispatchToProps = dispatch => ({
//   setEmail: value => dispatch(setEmail(value))
// })

const mapDispatchToProps = {
  setField,
  submitForm
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
