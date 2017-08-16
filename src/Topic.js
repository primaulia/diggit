import React, { Component } from 'react'
import { topicUrl } from './helpers/api'

class Topic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topic: {}
    }
  }

  componentDidMount() {
    fetch(topicUrl(this.props.match.params.id))
    .then(response => response.json())
    .then(res => {
      this.setState({
        topic: res
      })
    })
  }

  render() {
    return (
      <div>
        <h2>{this.state.topic.title}</h2>
        <h4>{this.state.topic.url}</h4>
        <p>{this.state.topic.content}</p>
      </div>
    )
  }
}

export default Topic