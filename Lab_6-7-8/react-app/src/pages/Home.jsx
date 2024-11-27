import React, {useContext, useEffect, useState} from 'react'
import styles from './Home.module.css'
import Heading from '../assets/heading.png'
import { ChainsawContext } from '../services/data/All_Chainsaws'
import ChainsawPreview from '../components/ChainsawPreview'

export default function Home() {
  useEffect(() => {
    document.title = '🧙‍♂️ Home Page 🧙‍♂️'
  })

  const chainsaws = useContext(ChainsawContext);
  const [visibleCount, setVisibleCount] = useState(3);

  const viewMore = () => {
    setVisibleCount(visibleCount + 3);
  }

  const hideAll = () => {
    setVisibleCount(3);
  }

  return (
    <div className={styles.home}>
      <div className={styles.hero__container}>
        <img className={styles.hero_img} src={Heading} alt="Heading's logo" />
        <div className={styles.hero_text}>
          <h1>Unleash the Timber Beast: Where Precision Meets Raw Power</h1>
          <p>
            Step into a world where strength and finesse unite. Our chainsaws 
            are crafted for those who demand more—more control, more durability, 
            more impact with every cut.Whether you do, this is a tool that honors 
            both the art and the thrill of the work.
          </p>
        </div>
      </div>
      <div className={styles.grid__container}>
        {chainsaws.slice(0, visibleCount).map((cnainsaw) => (
          <ChainsawPreview key={cnainsaw.id} chainsawImg={cnainsaw.imagelink} chainsawName={cnainsaw.name} chainsawDesc={cnainsaw.description} />)
        )}
      </div>
      <div className={styles.button__container}>
        {visibleCount < chainsaws.length && (<button onClick={viewMore} className={styles.viewmore_btn}>View more</button>)}
        {visibleCount >= chainsaws.length && (<button onClick={hideAll} className={styles.hide_btn}>Hide all</button>)}
      </div>
    </div>

  );
}
