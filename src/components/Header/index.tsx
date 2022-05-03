import React from 'react';
import './style.scss';

export const Header: React.FC<{title: string}> = ({ title }) => {
  return(
    <header className="header">
      <h1>{title}</h1>
    </header>
)
}