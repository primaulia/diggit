import React, { Component } from 'react'
import { Textarea, ButtonOutline } from 'rebass'

class CreateTopic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  render() {
    const { loading } = this.props
    return (
      <div>
        <Textarea
          rows={4}
          my={2}
          placeholder="What's up?"
          value={this.state.value}
        />
        <ButtonOutline
          children={loading ? 'Loading...' : 'Post a new topic'}
          disabled={loading || this.state.value === ''}
        />
      </div>
    )
  }
}

export default CreateTopic