



import React, { Component } from 'react'

import './contact.css'



class Contact extends Component {
	
	static key = { api: '/email', params: { path: '/contact' } }
	
	
	constructor( props ) {
		super( props )
		this.state = { email: '' }
	}
	
	
	componentDidMount( ) {
		const { api } = this.constructor.key
		this.constructor.key.load( api ).then( email => {
			console.log( email )
			this.setState( { email: email.data.fields.email } )
		} )
	}
	
	onSend( event ) {
		event.preventDefault( )
		console.log( 'Nothing submitted!' )
	}
	
	render( ) {
		return (
			<form onSubmit={ event => this.onSend( event ) }>
				<h3 className="contact-email"> { this.state.email } </h3>
				<label>
					Subject
					<input className="contact-field" name="title"/>
				</label>
				<label>
					Message
					<textarea className="contact-field" name="message"/>
				</label>
				<button className="contact-submit"> Send </button>
			</form>
		)
	}
	
}


export default Contact

