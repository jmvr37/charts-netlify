import React from 'react';
import SearchCity from './SearchCity';
import '../App.css';

function Home() {
  return (
    <div class="flex flex-col justify-center text-center h-2/3 py-28">
    <h1 class="py-6 font-serif text-5xl">Air Quality Forecast Chart</h1>
      <SearchCity />
    </div>
  );
}

export default Home;