import React from 'react'

import { MdOutlineDone } from 'react-icons/md'
import { eventBusService } from '../services/event-bus.service.js'


export class UserMsg extends React.Component {

  removeEvent;

  state = {
    msg: null
  }

  componentDidMount() {
    // Here we listen to the event that we emited, its important to remove the listener 
    this.removeEvent = eventBusService.on('show-user-msg', (msg) => {
      this.setState({ msg })
      setTimeout(() => {
        this.setState({ msg: null })
      }, 4500)
    })
  }

  componentWillUnmount() {
    this.removeEvent()
  }

  render() {
    const { msg } = this.state;
    if (!msg) return <span></span>
    const msgClass = msg.type || ''
    return (
      <section className={'user-msg flex align-center ' + msgClass}>
        <button className='msg-btn'  onClick={() => {
          this.setState({ msg: null })
        }}>X</button>
        {msg.txt}
        <MdOutlineDone />

      </section>
    )
  }
}
