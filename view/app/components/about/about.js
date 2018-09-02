



import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { getPhotos } from '../../actions/photos'
import './about.css'



class About extends Component {
	
	constructor( props ) {
		super( props )
		this.state = { artist: null }
	}
	
	
	async componentDidMount( ) {
		axios.get( '/bio' ).then( bio => {
			console.log( bio )
			this.setState( { artist: bio.data } )
		} )
		// Async setup for gallery photo data fetching via Redux
		await this.props.getPhotos( )
		console.log( this.props.photos )
	}
	
	affixImage( id, view ) {
		const level = 'about-' + id
		// Temporary values until images are fully customizable
		const url = view ? view.fields.image : 'img/test1.jpg'
		const image = this.state.artist ? '/public/' + url : null
		return image ? <img src={ image }/> : <div className={ level }/>
	}
	
	render( ) {
		const name = this.state.artist ? this.state.artist.fields.name : null
		const about = this.state.artist ? this.state.artist.fields.about : null
		const photo = this.state.artist ? this.state.artist.fields.image : ''
		return (
			<section className="about-section">
				<div className="about-border"/>
				<div id="about-portrait" className="about-frame">
					<h1> { name } </h1>
					<div className="about-image">
						{ this.affixImage( 'upper', photo ) }
					</div>
				</div>
				{ /* <div className="about-distort"/> */ }
				<div id="about-background" className="about-frame">
					<div className="about-text">
						<p> { about } </p>
					</div>
					<div className="about-image">
						{ this.affixImage( 'lower' ) }
					</div>
				</div>
			</section>
		)
	}
	
}


export default connect( data => ( { photos: data.photos } ), { getPhotos } )( About )


