import styles from '../styles/About.module.css';

export const About = () => {
  return (
    <>
    <div className={styles.body}>
      <div className={styles.textWrapper}>
        <h1 className={styles.textHeading}>About</h1>
        <p className={styles.textParagraph}>Hi. My name is Kristers and I am studying front-end development.<br/>
          This project is built using React, mySQL, TypeScript and Express.<br/>
          So far i do not have a lot of experience, but if you want to check out<br/>
          some other projects I have made look for my socials down below.
        </p>
        <p className={styles.arrowDown}>↓</p>
        <div className={styles.socialWrapper}>
          <a href="https://github.com/Kontrs" target='_blank'>
            <img src="/src/assets/images/github.png" alt="github" />
          </a>
          <a href="https://www.facebook.com/kristers.pulle" target='_blank'>
            <img src="/src/assets/images/facebook.png" alt="facebook" />
          </a>
          <a href="mailto:pulle265@gmail.com" target='_blank'>
            <img src="/src/assets/images/google.png" alt="google" />
          </a>
          <a href="https://www.instagram.com/kontrsk/" target='_blank'>
            <img src="/src/assets/images/instagram.png" alt="instagram" />
          </a>
          <a href="https://www.reddit.com/user/KontrsK" target='_blank'>
            <img src="/src/assets/images/reddit.png" alt="reddit" />
          </a>
        </div>
      </div>
    </div>
    </>
  )
}