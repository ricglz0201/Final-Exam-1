import React from 'react';

function BookForm({ callback }){
  const [value, setValue] = React.useState();
  const onSubmit = (e) => {
    e.preventDefault();
    callback(value);
  }
  const onChange = (e) => {
    setValue(e.target.value);
  }
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Book name</label>
        <input type="text" id="name" onChange={onChange} value={value} />
      </div>
      <div>
        <input type="submit" value="Search" />
      </div>
    </form>
  );
}

export default BookForm;
