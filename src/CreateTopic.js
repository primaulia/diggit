import React, { Component } from 'react'
import { Input, Textarea, ButtonOutline } from 'rebass'

class CreateTopic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      url: '',
      content: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleCreate = this.handleCreate.bind(this)
  }

  handleChange(event) {
    let field = event.target.name
    this.setState({[field]: event.target.value});
  }

  handleCreate() {
    this.props.onCreate(this.state.title, this.state.url, this.state.content)
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({
        title: '',
        url: '',
        content: ''
      })
    }
  }

  render() {
    const { loading } = this.props
    return (
      <div>
        <Input
          my={2}
          name="title"
          placeholder='Choose a title'
          onChange={this.handleChange}
          value={this.state.title}
        />
        <Input
          my={2}
          name="url"
          placeholder='Enter your URL'
          onChange={this.handleChange}
          value={this.state.url}
        />
        <Textarea
          rows={4}
          my={2}
          name="content"
          placeholder="What's up?"
          onChange={this.handleChange}
          value={this.state.content}
        />
        <ButtonOutline
          children={loading ? 'Loading...' : 'Post a new topic'}
          onClick={this.handleCreate}
          disabled={loading || this.state.title === '' || this.state.url === '' || this.state.content === ''}
        />
      </div>
    )
  }
}

export default CreateTopic