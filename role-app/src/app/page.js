'use client';
import { useState } from "react";
import { useForm } from "react-hook-form"

export default function Home() {
  return (
    <SearchForm />
  );
}

function SearchForm() {
  const [searchText, setSearchText] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitted }
  } = useForm({ defaultValues: { filterText: '' } });

  if (isSubmitted) {
    reset();
  }

  return (
    <>
      <form onSubmit={handleSubmit(data => setSearchText(data.filterText))}>
        <b>Pesquise um local:</b>
        <input
          type='text'
          placeholder='Digite algum local'
          required
          {...register('filterText')}
        />
        <button type='submit'>Search</button>
      </form>
      <p>{searchText}</p>
    </>
  );
}