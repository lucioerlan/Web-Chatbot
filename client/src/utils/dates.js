import React from 'react';

const time = new Date().getHours();

export const visitorTime = () => {
  if (time < 13) {
    return <> Hi, Good Morning visitor 🌅 </>;
  }
  if (time < 18) {
    return <> Hi, Good afternoon visitor ☀️</>;
  }
  return <> Hi, Good night visitor 🌙</>;
};
