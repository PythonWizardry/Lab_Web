import React, {useEffect, useState} from 'react'
import styles from './Home.module.css'
import Heading from '../assets/heading.png'
import ChainsawPreview from '../components/ChainsawPreview'
import Loader from '../components/Loader'
import { getToolsHome } from '../API/api'

// 
import Modern from '../assets/images_for_chainsaws/modern.jpg'
import Small from '../assets/images_for_chainsaws/small.jpg'
import Powerful from '../assets/images_for_chainsaws/powerful.jpg'
import Art from '../assets/images_for_chainsaws/art.jpg'
import Vintage from '../assets/images_for_chainsaws/vintage.jpg'
// 

export default function Home() {
  useEffect(() => {
    document.title = '🧙‍♂️ Home Page 🧙‍♂️'
  })

  const [chainsaws, setChaincsaws] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getToolsHome()
    .then(response => setChaincsaws(response.data))
    .catch(err => console.log(err))
    .finally(() => {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000); 
    });
  }, [])

  const [visibleCount, setVisibleCount] = useState(3);

  const viewMore = () => {
    setVisibleCount(visibleCount + 3);
  }

  const hideAll = () => {
    setVisibleCount(3);
  }


  function newGetImage(chainsawLink) {
    if (chainsawLink === "Art") {
      return Art;
    } else if (chainsawLink === "Modern") {
      return Modern;
    } else if (chainsawLink === "Powerful") {
      return Powerful;
    } else if (chainsawLink === "Small") {
      return Small;
    } else if (chainsawLink === "Vintage") {
      return Vintage;
    }
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
      {isLoading && <Loader/>}
      {!isLoading && ( 
        <>
          <div className={styles.grid__container}>
            {chainsaws.slice(0, visibleCount).map((chainsaw) => (
              <ChainsawPreview key={chainsaw.id} chainsawImg={newGetImage(chainsaw.imagelink)} chainsawName={chainsaw.name} chainsawDesc={chainsaw.description} />)
            )}
          </div>
          <div className={styles.button__container}>
            {visibleCount < chainsaws.length && (<button onClick={viewMore} className={styles.viewmore_btn}>View more</button>)}
            {visibleCount >= chainsaws.length && (<button onClick={hideAll} className={styles.hide_btn}>Hide all</button>)}
          </div>
        </>
      )}
    </div>

  );
}
