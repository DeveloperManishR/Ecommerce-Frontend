import React from 'react';
import { MdOutlineStarOutline, MdOutlineStar, MdOutlineStarHalf } from 'react-icons/md';

const DynamicRating = ({ rating }) => {
  // Maximum number of stars you want to display
  const maxStars = 5;

  // Create an array to hold the star icons
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(rating)) {
      // Full star for integer parts of the rating
      stars.push(<MdOutlineStar key={i} />);
    } else if (i === Math.floor(rating) + 1 && rating % 1 >= 0.5) {
      // Half star if the decimal part is between 0.5 and 0.9
      stars.push(<MdOutlineStarHalf key={i} />);
    } else {
      // Empty star for remaining slots
      stars.push(<MdOutlineStarOutline key={i} />);
    }
  }

  return <div className="text-base text-lightText flex items-center">{stars}</div>;
};

export default DynamicRating;
