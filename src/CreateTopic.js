import React, { Component } from 'react'
import { Textarea, ButtonOutline } from 'rebass'

class CreateTopic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleCreate() {
    this.props.onCreate(this.state.value)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({value: ''})
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
          onChange={this.handleChange}
          value={this.state.value}
        />
        <ButtonOutline
          children={loading ? 'Loading...' : 'Post a new topic'}
          onClick={this.handleCreate}
          disabled={loading || this.state.value === ''}
        />
      </div>
    )
  }
}

export default CreateTopic