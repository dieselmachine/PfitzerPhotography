



import React, { Component } from 'react'

import './slide.css'



class Slide extends Component {
	
	constructor( props ) {
		super( props )
		// Locates the slide dimensions for selecting slide photos
		this.boundary = React.createRef( )
		this.state = { current: null, previous: null, scope: { x: 0, y: 0 } }
		this.viewNext = this.viewNext.bind( this )
	}
	
	
	componentDidMount( ) {
		// Identify the slider boundary to measure images against
		const height = this.boundary.current.clientHeight
		const width = this.boundary.current.clientWidth
		this.setState( { scope: { x: width, y: height } } )
	}
	
	componentDidUpdate( ) {
		if ( !this.state.current && this.props.photos.length > 0 ) {
			// Set the initial slider image before initializing the slider
			this.metamorphosis = this.viewNext( )
		}
	}
	
	componentWillUnmount( ) {
		clearInterval( this.metamorphosis )
	}
	
	viewNext( ) {
		const data = this.yieldPhoto( 0 )
		const url = data ? '/public/' + data.image : null
		const text = data ? data.description : null
		this.setState( { current: { url, text }, previous: this.state.current } )
		// Delete all previous image data once it is fully faded out
		setTimeout( ( ) => this.setState( { previous: null } ), 2500 )
		// Only start up the image slider if it's not already running
		console.log( '\nNext:', { url: url, text: text } )
		console.log( 'Previous:', this.state.previous )
		const exe = ( ) => setInterval( this.viewNext, 7500 )
		return !this.metamorphosis ? exe( ) : undefined
	}
	
	yieldPhoto( cycle ) {
		// Generate an array index to randomize photo inspection
		const random = Math.random( ) * this.props.photos.length
		const identifier = Math.floor( random )
		// Verify whether or not the image will fill the slider area
		const { height, width } = this.props.photos[ identifier ].fields
		const fill = height >= this.state.scope.y && width >= this.state.scope.x
		// Keep searching until a sufficiently sized image is found
		const view = fill ? this.props.photos[ identifier ].fields : null
		const maximum = cycle++ === 20 || fill
		return !maximum ? this.yieldPhoto( cycle ) : view
	}
	
	embedImage( attrs ) {
		return attrs ? <img src={ attrs.url } alt={ attrs.text }/> : null
	}
	
	render( ) {
		// Bottom embedded image fades out on slide transition
		return (
			<div className="slide-view" ref={ this.boundary }>
				{ this.embedImage( this.state.current ) }
				{ this.embedImage( this.state.previous ) }
			</div>
		)
	}
	
}


export default Slide



