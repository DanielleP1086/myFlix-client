import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState('');
  const [removeMovie, setRemoveMovie] = useState('');

  const updateProfile = (e) => {
    e.preventDefault();
    axios.put('https://filmx-society.herokuapp.com/users/:Username', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
      //after the request has been made if there's a match props will be called with username and token
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('update unsucccessful')
      });
  };

  const viewFavorites = (e) => {
    e.preventDefault();
    axios.get('https://filmx-society.herokuapp.com/users/:Username/Movies/', {
      FavoriteMovies: favoriteMovies
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('something went wrong')
      });
  };

  //add second parameters to axios.delete 
  const removeMovie = (e) => {
    e.preventDefault();
    axios.delete('https://filmx-society.herokuapp.com/users/:Username/Movies/:MovieID'), {}
  }

  const deleteProfile = (e) => {
    e.preventDefault();
    axios.delete('https://filmx-society.herokuapp.com/users/:Username'), {
      removeMovie: removeMovie
    }
      .then(() => { })



  }

  return (
    <div className="profile-view">
      <
    </div>
  );
}