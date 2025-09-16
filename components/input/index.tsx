import React from 'react';

export default function input({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  return (
    <>
      <label htmlFor={name}>Name</label>
      <input type="text" name={name} />
    </>
  );
}
