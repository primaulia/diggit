import React, { Component } from 'react'
import { Group, Flex, ButtonOutline, Button } from 'rebass'
import { NavLink } from 'react-router-dom'

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: props.current
    }

    this.handlePageClick = this.handlePageClick.bind(this)
  }

  handlePageClick(i) {
    this.setState({ current: i })
    this.props.onPageClick(i)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ current: nextProps.current })
  }

  render() {
    const { count } = this.props
    const listItems = []
    for (let i = 1; i <= count; i++) {
      listItems.push( <NavLink to={`/${i}`} key={i}>i</NavLink> )
      /*if (i === this.state.current) {
        listItems.push( <Button children={i} key={i} /> )
      } else {
        listItems.push( <ButtonOutline children={i} key={i} onClick={this.handlePageClick.bind(this, i)}/> )
      }*/
    }
    return (
      <Flex justify="center">
        <Group>
          {listItems}
        </Group>
      </Flex>
    )
  }
}

export default Pagination