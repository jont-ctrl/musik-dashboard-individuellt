function InfoTag({ name }) {
  return (
    <>
      <span className='bg-secondary dark:bg-secondary-dark text-text dark:text-text-dark px-4 py-2 rounded-lg  text-sm'>
        {name}
      </span>
    </>
  );
}

export default InfoTag;
