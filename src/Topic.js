import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { Box, Flex, Card, Text, ButtonOutline, Subhead } from 'rebass'

const textStyle = {
  whiteSpace: 'pre-line'
};

class Topic extends Component {
  constructor(props) {
    super(props)
    // Keeping votes on state to render optimistically
    this.state = {
      votes: props.data.votes,
      lastSentCount: props.data.votes
    }

    this.handleUpvote = this.handleUpvote.bind(this)
    this.handleDownvote = this.handleDownvote.bind(this)
    // Debounce quick clicks to reduce network calls
    this.onVote = debounce(this.onVote, 500, {leading: true, trailing: true})
  }

  handleUpvote() {
    this.handleVote(1)
  }

  handleDownvote() {
    this.handleVote(-1)
  }

  handleVote(count) {
    // Set optimistic state
    this.setState({ 
      votes: this.state.votes + count
    }, this.onVote())
  }

  onVote() {
    // Send vote state change
    this.props.onVote(this.state.votes - this.state.lastSentCount)
    this.setState({ 
      lastSentCount: this.state.votes
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      votes: nextProps.data.votes
    })
  }

  render() {
    const { data } = this.props
    return (
      <Card my={4} p={4}>
        <Flex>
          <Box flex='1'>
            <Text children={data.content} style={textStyle}/>
          </Box>
          <Box>
            <ButtonOutline onClick={this.handleUpvote}>
              <i className="material-icons">arrow_drop_up</i>
            </ButtonOutline>
            <Subhead center children={this.state.votes} />
            <ButtonOutline onClick={this.handleDownvote}>
              <i className="material-icons">arrow_drop_down</i>
            </ButtonOutline>
          </Box>
        </Flex>
      </Card>
    )
  }
}

export default Topic;