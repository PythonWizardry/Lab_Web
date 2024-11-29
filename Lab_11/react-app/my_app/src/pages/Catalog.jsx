import React, { useState, useEffect } from "react";
import styles from "./Catalog.module.css";
import Filter from "../components/Filter";
import Search from "../components/Search";
import ChainsawCart from "../components/ChainsawCart";
import Loader from "../components/Loader";
import { getCatalog } from "../API/api";

import Modern from '../assets/images_for_chainsaws/modern.jpg'
import Small from '../assets/images_for_chainsaws/small.jpg'
import Powerful from '../assets/images_for_chainsaws/powerful.jpg'
import Art from '../assets/images_for_chainsaws/art.jpg'
import Vintage from '../assets/images_for_chainsaws/vintage.jpg'




export default function Catalog() {

  const [isLoading, setIsLoading] = useState(true);
  // const [chainsaws, setChainsaws] = useState([]);
  const [filteredChainsaws, setFilteredChainsaws] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [powerFilter, setPowerFilter] = useState("All");
  const [chainRevolutionsFilter, setChainRevolutionsFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");

  useEffect(() => {
    document.title = "🧙‍♂️ Catalog page 🧙‍♂️";
  });


  const fetchCatalog = () => {
    setIsLoading(true);
    getCatalog({ powerFilter, chainRevolutionsFilter, priceFilter, searchQuery })
      .then(response => {
        // setChainsaws(response.data);
        setFilteredChainsaws(response.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000); 
      });
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  const applyFilters = () => {
    fetchCatalog();
  };

  
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
    <div className={styles.catalog}>
      <div className={styles.top_part}>
        <div className={styles.filters__container}>
          <div className={styles.filters}>
            <Filter 
              default_descriprion={'All prices'} 
              options={[
                { value: '400', label: 'Up to $400' },
                { value: '500', label: 'Up to $500' },
                { value: '700', label: 'Up to $700' },
                { value: '1000', label: 'Up to $1000' },
              ]} 
              onChange={setPriceFilter}/>
            <Filter 
              default_descriprion={'All powers'} 
              options={[
                { value: '2.0', label: 'Up to 2.0 kW' },
                { value: '2.5', label: 'Up to 2.5 kW' },
                { value: '3.0', label: 'Up to 3.0 kW' },
                { value: '3.5', label: 'Up to 3.5 kW' },
              ]} 
              onChange={setPowerFilter}/>
            <Filter 
              default_descriprion={'All Chain Revolutions'} 
              options={[
                { value: '9000', label: 'Up to 9000 rpm' },
                { value: '10000', label: 'Up to 10000 rpm' },
                { value: '11000', label: 'Up to 11000 rpm' },
                { value: '12000', label: 'Up to 12000 rpm' },
              ]} 
              onChange={setChainRevolutionsFilter}/>
          </div>
          <Search onChange={setSearchQuery}/>
          <button  onClick={applyFilters} className={styles.apply_btn}>Apply</button>
        </div>
      </div>
      {isLoading && <Loader/>}
      {!isLoading && ( 
        <>
          <div className={styles.grid__container}>
            {filteredChainsaws.map((chainsaw) => (
              <ChainsawCart key={chainsaw.id} chainsaw={chainsaw} imagelink={newGetImage(chainsaw.imagelink)} />)
            )}
          </div>
        </>
      )}
    </div>
  );
}
