import React, { Component } from 'react'
import { Container, Subhead, Divider } from 'rebass'
import { CSSTransitionGroup } from 'react-transition-group'
import Topic from './Topic'

class TopicsList extends Component {
  render() {
    const listItems = this.props.topics.map(topic =>
      <Topic data={topic} key={topic.id} onVote={(count) => this.props.onVote(topic.id, count)} />
    )
    return (
      <Container my={4} pl={0}>
        <Subhead children="Or check out what's popular" />
        <Divider my={2} color='gray3' />
        <CSSTransitionGroup
          transitionName="topics"
          transitionEnterTimeout={500}
          transitionLeave={false}>
          { listItems }
        </CSSTransitionGroup>
      </Container>
    )
  }
}

export default TopicsList;