import React from 'react';

export default function ContactCard({ name, email, phone, img }) {
  let imageUrl;
  if (img) {
    const image = new Blob([img]);
    imageUrl = URL.createObjectURL(image);
  }

  return (
    <div>
      <p>{name}</p>
      <img
        src={imageUrl}
        alt=''
      />
    </div>
  );
}
