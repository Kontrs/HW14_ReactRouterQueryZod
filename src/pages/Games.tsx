import styles from  '../styles/Games.module.css';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export const ratingToStars = (rating: string): JSX.Element[] => {
  const ratingNum = Number(rating);
  const stars = Array.from({ length: ratingNum }, (_, index): JSX.Element => (
    <i className={`fas fa-star`} key={index}></i>
  ));
  return stars;
};

export type Game = {
  id: number,
  image: string,
  title: string,
  genre: string,
  description: string,
  rating: string
};

const initFormValue = {title: '', genre: '', description: '', rating: ''};

export const Games = (): JSX.Element => {
  const [formValues, setFormValues] = useState(initFormValue)
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const newGame = {id: Math.random(), image: 'public/default-image.jpg', ...formValues};

  const handleRatingChange = (value: string): void => {
    setFormValues({
      ...formValues,
      rating: value
    });
  };
 
  const {data: games, error, isLoading} = useQuery({
    queryKey: ['gamesData'], 
    queryFn: async (): Promise<Game[]> => {
      const response = await axios.get('http://localhost:3001/games');
      return response.data;
    }
  });

  const newGameMutation = useMutation({
    mutationFn: (formValues: Game) => {
      return axios.post('http://localhost:3001/game', formValues);
    },
    onSuccess: (): void => {
      queryClient.invalidateQueries({queryKey: ['gamesData']});
      setFormValues(initFormValue);
    }
  });

  const deleteGameMutation = useMutation({
    mutationFn: (gameId: number) => {
      return axios.delete(`http://localhost:3001/games/${gameId}`)
    },
    onSuccess: (): void => {
      queryClient.invalidateQueries({queryKey: ['gamesData']});
      navigate('/games')
    }
  });

  if (isLoading) {
    return <div className={styles.loadingOrError}>Loading games...</div>;
  }
  if (error) {
    return <div className={styles.loadingOrError}>An error occurred: {error.message}</div>;
  }

  return (
    <>
    <div className={styles.cardWrapper}>
      {games?.map((game: Game): JSX.Element => (
        <Link to={`/games/${game.id}`} key={game.id} className={styles.card}>
          <img className={styles.cardImage} src={game.image} alt='game-img'/>
          <h1 className={styles.cardTitle}>{game.title}</h1>
          <p className={styles.cardGenre}>{game.genre}</p>
          <p className={styles.cardDescription}>{game.description}</p>
          <div className={styles.ratingAndButton}>
            <div className={styles.cardRating}>{ratingToStars(game.rating)}</div>
            <div className={styles.buttonWrapper}>
              <button className={styles.button} onClick={(): void => deleteGameMutation.mutate(game.id)}>Delete</button>
            </div>
          </div>
        </Link>
      ))}
    </div>
    <form 
      className={styles.inputWrapper} 
      onSubmit={(e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault()
        newGameMutation.mutate(newGame)}}
    >
      <h1 className={styles.inputHeading}>Add a new game</h1>
      <label htmlFor='title' className={styles.inputLabel}>What is the game called?</label>
      <input 
        type='text' 
        id='title' 
        className={styles.input} 
        placeholder='Title' 
        value={formValues.title} 
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setFormValues({
            ...formValues,
            title: e.target.value
          })
        }} 
        required
      />
      <label htmlFor='title' className={styles.inputLabel}>What genre is the game?</label>
      <input 
        type='text' 
        id='genre' 
        className={styles.input}  
        placeholder='Genre' 
        value={formValues.genre} 
        onChange={(e: ChangeEvent<HTMLInputElement>): void => {
          setFormValues({
            ...formValues,
            genre: e.target.value
          })
        }} 
        required
      />
      <label htmlFor='title' className={styles.inputLabel}>Describe the game in your own words.</label>
      <textarea 
        id='description' 
        className={styles.input}  
        placeholder='Description' 
        value={formValues.description} 
        onChange={(e: ChangeEvent<HTMLTextAreaElement>): void => {
          setFormValues({
            ...formValues,
            description: e.target.value
          })
        }}
        required>
      </textarea>
      <label htmlFor='star1'>Rate the game</label>
      <div className={styles.inputRating}>
        <input 
          type='radio' 
          id='star5' 
          name='rating' 
          value='5' 
          onChange={(e: ChangeEvent<HTMLInputElement>): void => handleRatingChange(e.target.value)} 
          checked={formValues.rating === '5'}
          required
        />
        <label className='star' htmlFor='star5' title='Awesome'></label>
        <input 
          type='radio' 
          id='star4' 
          name='rating' 
          value='4' 
          onChange={(e: ChangeEvent<HTMLInputElement>): void => handleRatingChange(e.target.value)}
          checked={formValues.rating === '4'}
          required
        />
        <label className='star' htmlFor='star4' title='Great'></label>
        <input 
          type='radio' 
          id='star3' 
          name='rating' 
          value='3' 
          onChange={(e: ChangeEvent<HTMLInputElement>): void => handleRatingChange(e.target.value)} 
          checked={formValues.rating === '3'}
          required
        />
        <label className='star' htmlFor='star3' title='Very good'></label>
        <input 
          type='radio' 
          id='star2' 
          name='rating'
          value='2'
          onChange={(e: ChangeEvent<HTMLInputElement>): void => handleRatingChange(e.target.value)} 
          checked={formValues.rating === '2'}
          required
        />
        <label className='star' htmlFor='star2' title='Good'></label>
        <input 
          type='radio' 
          id='star1' 
          name='rating' 
          value='1' 
          onChange={(e: ChangeEvent<HTMLInputElement>): void => handleRatingChange(e.target.value)} 
          checked={formValues.rating === '1'}
          required
        />
        <label className='star' htmlFor='star1' title='Bad'></label>
      </div>
      <button className={styles.button} type='submit'>Add game</button>
    </form>
    </>
  );
};