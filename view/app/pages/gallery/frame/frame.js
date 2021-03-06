



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import Panel from './panel/panel'
import './frame.css'



class Frame extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { viewMode: 'hide' }
		this.elevateUp = this.elevateUp.bind( this )
		this.fallBack = this.fallBack.bind( this )
	}
	
	
	componentWillUnmount( ) {
		clearTimeout( this.ascend )
		clearTimeout( this.descend )
	}
	
	elevateUp( ) {
		if ( this.state.viewMode !== 'fade' ) {
			this.setState( { viewMode: 'view' } )
		}
		else if ( this.state.viewMode === 'fade' ) {
			// Prevent panel snapping from quickly moving back
			this.ascend = setTimeout( ( ) => {
				this.setState( { viewMode: 'view' } )
			}, 250 )
		}
	}
	
	fallBack( ) {
		if ( this.state.viewMode !== 'hide' ) {
			this.descend = setTimeout( ( ) => {
				// Disallow panel hiding if it is being viewed again
				if ( this.state.viewMode !== 'view' ) {
					this.setState( { viewMode: 'hide' } )
				}
			}, 750 )
			this.setState( { viewMode: 'fade' } )
		}
	}
	
	render( ) {
		const url = this.props.url + '/' + this.props.image.name
		const image = '/root/' + this.props.image.image
		const props = { src: image, alt: this.props.image.description }
		const events = { onMouseEnter: this.elevateUp, onMouseLeave: this.fallBack }
		return (
			<div className="frame-area" { ...events }>
				<div className="frame-elastic">
					<div className="frame-shadow"/>
					<Link to={ { pathname: url, state: { image: this.props.image } } }>
						<div className="frame-image">
							<div className="frame-border"/>
							<img className="frame-thumbnail" { ...props }/>
						</div>
					</Link>
					<Panel mode={ this.state.viewMode } image={ this.props.image }/>
				</div>
			</div>
		)
	}
	
}


export default Frame



