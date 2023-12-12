import styles from  '../styles/Games.module.css';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

type Game = {
  id: number,
  image: string,
  title: string,
  genre: string,
  description: string,
  rating: string
};

const initFormValue = {title: '', genre: '', description: '', rating: ''}

export const Games = () => {
  const [formValues, setFormValues] = useState(initFormValue)
  const queryClient = useQueryClient();

  const fetchGames = async (): Promise<Game[]> => {
    const response = await axios.get('http://localhost:3001/games');
    return response.data;
  }

  const ratingToStars = (rating: string) => {
    const ratingNum = Number(rating);
    const stars = Array.from({ length: ratingNum }, (_, index: number): JSX.Element => (
      <i className={`fas fa-star`} key={index}></i>
    ));
    return stars;
  };

  const handleRatingChange = (value: string) => {
    setFormValues({
      ...formValues,
      rating: value
    })
  }
  
  const {data: games, error, isLoading} = useQuery({queryKey: ['gamesData'], queryFn: fetchGames});

  if (isLoading) {
    return <div>Loading games...</div>
  }
  if (error) {
    return <div>An error occurred: {error.message}</div>
  }

  const handleSubmit = () => {

  }
  return (
    <>
    <div className={styles.cardWrapper}>
      {games?.map((game: Game): JSX.Element => (
        <div className={styles.card} key={game.id}>
          <img className={styles.cardImage} src={game.image} alt='game-img'/>
          <h1 className={styles.cardTitle}>{game.title}</h1>
          <p className={styles.cardGenre}>{game.genre}</p>
          <p className={styles.cardDescription}>{game.description}</p>
          <div className={styles.cardRating}>{ratingToStars(game.rating)}</div>
          <div className={styles.buttonWrapper}>
            <button className={styles.button}>Delete</button>
          </div>
        </div>
      ))}
    </div>
    <form className={styles.inputWrapper} onSubmit={handleSubmit}>
      <h1 className={styles.inputHeading}>Add a new game</h1>
      <label htmlFor='title'>What is the game called?</label>
      <input 
        type='text' 
        id='title' 
        className={styles.input} 
        placeholder='Title' 
        value={formValues.title} 
        onChange={(e) => {
          setFormValues({
            ...formValues,
            title: e.target.value
          })
        }} 
        required
      />
      <label htmlFor='title'>What genre is the game?</label>
      <input 
        type='text' 
        id='genre' 
        className={styles.input}  
        placeholder='Genre' 
        value={formValues.genre} 
        onChange={(e) => {
          setFormValues({
            ...formValues,
            genre: e.target.value
          })
        }} 
        required
      />
      <label htmlFor='title'>Describe the game in your own words.</label>
      <textarea 
        id='description' 
        className={styles.input}  
        placeholder='Description' 
        value={formValues.description} 
        onChange={(e) => {
          setFormValues({
            ...formValues,
            description: e.target.value
          })
        }}
        required>
      </textarea>
      <label htmlFor='star1'>Rate the game</label>
      <div className={styles.inputRating}  >
        <input 
          type='radio' 
          id='star5' 
          name='rating' 
          value='5' 
          onChange={(e) => handleRatingChange(e.target.value)} 
          checked={formValues.rating === '5'}
        />
        <label className='star' htmlFor='star5' title='Awesome'></label>
        <input 
          type='radio' 
          id='star4' 
          name='rating' 
          value='4' 
          onChange={(e) => handleRatingChange(e.target.value)}
          checked={formValues.rating === '4'}
        />
        <label className='star' htmlFor='star4' title='Great'></label>
        <input 
          type='radio' 
          id='star3' 
          name='rating' 
          value='3' 
          onChange={(e) => handleRatingChange(e.target.value)} 
          checked={formValues.rating === '3'}
        />
        <label className='star' htmlFor='star3' title='Very good'></label>
        <input 
          type='radio' 
          id='star2' 
          name='rating'
          value='2'
          onChange={(e) => handleRatingChange(e.target.value)} 
          checked={formValues.rating === '2'}
        />
        <label className='star' htmlFor='star2' title='Good'></label>
        <input 
          type='radio' 
          id='star1' 
          name='rating' 
          value='1' 
          onChange={(e) => handleRatingChange(e.target.value)} 
          checked={formValues.rating === '1'}
        />
        <label className='star' htmlFor='star1' title='Bad'></label>
      </div>
      <button className={styles.button} type='submit'>Add game</button>
    </form>
    </>
  );
};