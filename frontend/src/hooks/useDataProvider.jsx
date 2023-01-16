import { useContext } from 'react';
import DataContext from '../context/dataContext';

const useDataProvider = () => useContext(DataContext);

export default useDataProvider;