import React, { useContext, useState, useEffect } from "react";
import styles from "./Catalog.module.css";
import { ChainsawContext } from '../services/data/All_Chainsaws'
import Filter from "../components/Filter";
import Search from "../components/Search";
import ChainsawCart from "../components/ChainsawCart";

export default function Catalog() {
  useEffect(() => {
    document.title = "🧙‍♂️ Catalog page 🧙‍♂️";
  });

  const chainsaws = useContext(ChainsawContext);
  const [searchQuery, setSearchQuery] = useState('');

  // const filteredChainsaws = chainsaws.filter((chainsaw) =>
  //   chainsaw.name.toLowerCase().replace(/\s/g, '').includes(searchQuery.toLowerCase().replace(/\s/g, ''))
  //   || chainsaw.description.toLowerCase().replace(/\s/g, '').includes(searchQuery.toLowerCase().replace(/\s/g, ''))
  // );

  // * just trying to create filters 

  const [powerFilter, setPowerFilter] = useState("All");
  const [chainRevolutionsFilter, setChainRevolutionsFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [filteredChainsaws, setFilteredChainsaws] = useState(chainsaws);

  const applyFilters = () => {
    const filtered = chainsaws.filter((chainsaw) => {
      const powerMatch = powerFilter === "All" || chainsaw.power <= Number(powerFilter);
      const chainRevolutionsMatch = chainRevolutionsFilter === "All" || chainsaw.chainRevolutions <= Number(chainRevolutionsFilter);
      const priceMatch = priceFilter === "All" || chainsaw.price <= Number(priceFilter);
      const searchMatch = chainsaw.name.toLowerCase().replace(/\s/g, '').includes(searchQuery.toLowerCase().replace(/\s/g, ''))
      || chainsaw.description.toLowerCase().replace(/\s/g, '').includes(searchQuery.toLowerCase().replace(/\s/g, ''));

      return powerMatch && chainRevolutionsMatch && priceMatch && searchMatch;
    });
    setFilteredChainsaws(filtered);
  };

  // *



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
      <div className={styles.grid__container}>
        {filteredChainsaws.map((chainsaw) => (
          <ChainsawCart key={chainsaw.id} chainsaw={chainsaw} />)
        )}
      </div>
    </div>
  );
}
