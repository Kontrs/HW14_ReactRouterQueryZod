import styles from '../styles/Games.module.css';
import { ratingToStars } from './Games';
import { Game } from './Games';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const GameDisplay = (): JSX.Element => {
  const { id } = useParams();
  const gameId = Number(id);
  const {data: games, error, isLoading} = useQuery({
    queryKey: ['game'], 
    queryFn: async (): Promise<Game[]> => {
      const response = await axios.get<Game[]>('http://localhost:3001/games');
      return response.data;
    }
  });

  if (isLoading) {
    return <div className={styles.loadingOrError}>Loading games...</div>;
  }
  if (error) {
    return <div className={styles.loadingOrError}>An error occurred: {error.message}</div>;
  }
  
  const selectedGame = games?.find((game: Game): boolean => game.id === gameId);
  console.log('Image Path:', selectedGame?.image);
  
  return (
    <div className={styles.gameWrapper}>
      <div className={styles.card} key={selectedGame?.id}>
        <img className={styles.cardImage} src={selectedGame?.image} alt='game-img'/>
        <h1 className={styles.cardTitle}>{selectedGame?.title}</h1>
        <p className={styles.cardGenre}>{selectedGame?.genre}</p>
        <p className={styles.cardDescription}>{selectedGame?.description}</p>
        <div className={styles.ratingAndButton}>
          <div className={styles.cardRating}>{selectedGame?.rating ? ratingToStars(selectedGame.rating) : 'No Rating'}</div>
        </div>
      </div>
    </div>
  )
}