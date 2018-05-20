import React, { Component } from 'react'

export default props => (
  <div className="field">
    <label className="label">{props.title}</label>
    <div
      className={`control has-icons-left ${props.error && 'has-icons-right'} `}
    >
      <input
        className={`input ${props.error && 'is-danger'} `}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
      <span className="icon is-small is-left">
        <i className={`fas ${props.icon}`} />
      </span>
      {props.error && (
        <span className="icon is-small is-right">
          <i className="fas fa-exclamation-triangle" />
        </span>
      )}
      {props.required &&
        props.value === '' && (
          <p className="help is-danger">{props.title} is required</p>
        )}
      {props.error && <p className="help is-danger">{props.error}</p>}
    </div>
  </div>
)
