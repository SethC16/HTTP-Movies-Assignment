import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';


const initialItem = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: ''
  };

const MovieForm = (props) => {
    const [movie, setMovie] = useState(initialItem);
	// const { id } = useParams();
	

		useEffect(() => {
			axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
		}, [props.match.params.id])

	const changeHandler = e => {
		setMovie ({ ...movie, [e.target.name]: e.target.value}) 
	};

	const handleSubmit = e => {
		e.preventDefault();
		// make a PUT request to edit the item
		axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
			.then( res => {
                props.setMovie(res.data);
				props.history.push(`/movies/${movie.id}`);
			})
			.catch( err => console.log(err))
	};

	return (
		<div>
			<h2 className='updatemovie'>Update Movie</h2>
			
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name='title'
					onChange={changeHandler}
					placeholder="Title"
					value={movie.title}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="director"
					onChange={changeHandler}
					placeholder="Director"
					value={movie.director}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="metascore"
					onChange={changeHandler}
					placeholder="Metascore"
					value={movie.metascore}
				/>
				<div className="baseline" />

				<input
					type="text"
					name="stars"
					onChange={changeHandler}
					placeholder="Stars"
					value={movie.stars}
				/>
				<div className="baseline" />

				<button className="md-button form-button">Update</button>
			</form>
		</div>
	);
};

export default MovieForm;