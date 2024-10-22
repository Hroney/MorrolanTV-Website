import React from 'react';

export class Tools extends React.Component {

  state = {
    content: 'Hello! :('
  }

  render = () => (
    <div className='tools component'>
      <h1>Tools Page</h1>
      <p>{this.state.content}</p>
    </div>
  )
}
