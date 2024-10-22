import React from 'react';

export class Support extends React.Component {
  // componentDidMount = async () => {
  //   const response = await fetch('/some/api')
  //   const json = await response.json()
  //   this.setState({ content: json.content })
  // }

  // componentDidUpdate = () => {}
  // componentWillUnmount = () => {}

  state = {
    content: 'Hello! :('
  }

  render = () => (
    <div className='support component'>
      <h1>Support Page</h1>
      <p>{this.state.content}</p>
      <iframe
        src="https://streamelements.com/morrolantv/tip"
        width="100%"
        height="600px"
        frameBorder="0"
        allowFullScreen
      />

    </div>
  )
}
