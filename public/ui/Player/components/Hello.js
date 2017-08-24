import React, { Component } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
    font-family: Noto Sans, -apple-system, BlinkMacSystemFont, Segoe UI,Roboto, Helvetica, Arial, sans-serif;
`

class Hello extends Component {
	render() {
		return (
			<Wrapper>
				<span>Hello, { this.props.name }.</span>
			</Wrapper>
		)
	}
}
export default Hello
