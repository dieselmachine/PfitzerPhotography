



import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './home.css'



class Home extends Component {
	
	render( ) {
		return (
			<section>
				<Link to="/gallery">
					<img className="home-img" alt="image"/>
				</Link>
			</section>
		)
	}
	
}


export default Home


