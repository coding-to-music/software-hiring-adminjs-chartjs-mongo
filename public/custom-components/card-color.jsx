import React from 'react';

function setRandomBackgroundColor(card) {
  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  card.style.backgroundColor = randomColor;
}

function Card(props) {
  return (
    <div
      className="card"
      bg={() => setRandomBackgroundColor(this)}
      ref={(card) => this.card = card}
    >
      {props.children}
    </div>
  );
}

export default Card;
