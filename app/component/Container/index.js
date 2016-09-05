import React, { Component } from 'react';

export default class Container extends Component {
	render() {
		return (
			<div style={{height: "100%"}}>
				{this.props.children}
			</div>
		)
	}

}