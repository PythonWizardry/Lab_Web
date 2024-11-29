import axios from 'axios';

export const getToolsHome = async () => {
    return await axios.get('http://localhost:3001/api/home');
}


export const getCatalog = async (filters) => {
    const { powerFilter, chainRevolutionsFilter, priceFilter, searchQuery } = filters;
    return await axios.get('http://localhost:3001/api/catalog', {
      params: {
        powerFilter,
        chainRevolutionsFilter,
        priceFilter,
        searchQuery
    }
  });
};

export const getToolItem = async (id) => {
    return await axios.get(`http://localhost:3001/api/item/${id}`)
}