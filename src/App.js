import React, { Component } from 'react'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { topicsUrl, topicUrl } from './helpers/api'
import { Provider, Container, Heading } from 'rebass'
import CreateTopic from './CreateTopic'
import TopicsList from './TopicsList'
import Pagination from './Pagination'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      topics: [],
      loading: false,
      currentPage: 1
    }

    this.setTopics = this.setTopics.bind(this)
    this.handleVote = this.handleVote.bind(this)
    this.handleCreateTopic  = this.handleCreateTopic.bind(this)
    this.handleTopicsListUpdate = this.handleTopicsListUpdate.bind(this)
    this.handlePageClick = this.handlePageClick.bind(this)
  }

  getTopics(page) {
    fetch(topicsUrl + "?page=" + page)
    .then(response => response.json())
    .then(this.setTopics)
  }

  setTopics(res) {
    this.setState({
      topics: res.data.topics,
      pages: res.data.pages
    })
  }

  handleVote(topicId, count) {
    fetch(topicUrl(topicId), {
      method: 'PATCH',
      body: JSON.stringify({"votes": count}),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    })
  }

  handleCreateTopic(title, url, content) {
    this.setState({ loading: true })
    let topics = this.state.topics
    let newTopic = {
      title,
      url,
      content
    }
    topics.unshift(newTopic)
    this.setState({ topics })
    fetch(topicsUrl, {
      method: 'POST',
      body: JSON.stringify({
        'content': content
      }),
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      })
    })
    .then(response => response.json())
    // .then(this.handleTopicsListUpdate)
  }

  handleTopicsListUpdate(res) {
    this.setState({
      loading: false,
      topics: res.data.topics,
      pages: res.data.pages
    })
  }

  handlePageClick(page) {
    this.setState({ currentPage: page })
    this.getTopics(page)
  }

  componentDidMount() {
    this.getTopics(this.state.currentPage)
  }

  render() {
    return (
      <Provider>
        <Container m={5}>
          <Heading children='Diggit' />
          <CreateTopic onCreate={this.handleCreateTopic} loading={this.state.loading}/>
          <TopicsList topics={this.state.topics} onVote={this.handleVote} />
          <Pagination count={this.state.pages} current={this.state.currentPage} onPageClick={this.handlePageClick}/>
        </Container>
      </Provider>
    );
  }
}

export default App;
