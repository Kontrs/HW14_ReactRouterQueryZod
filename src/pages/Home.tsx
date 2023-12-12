import styles from '../styles/Home.module.css';

export const Home = () => {
  return (
    <>
      <div className={styles.textWrapper}>
        <h1 className={styles.textHeading}>Welcome to the Hobby webpage</h1>
        <p className={styles.textParagraph}>Here you can see different hobbies that I enjoy</p>
        <p className={styles.textWtextParagraphrapper}>Navigate through the navigation bar at the top to see them</p>
      </div>
      <div className={styles.imageWrapper}>
        <img className={styles.image1} src="/src/assets/images/gaming.jpg" alt="gaming" />
        <img className={styles.image2} src="/src/assets/images/paula.jpg" alt="bmxsupercross" />
        <img className={styles.image3} src="/src/assets/images/climbing.jpg" alt="climbing" />
      </div>
    </>
  )
}