import React from 'react';
import { MdOutlineStarOutline, MdOutlineStar } from 'react-icons/md';

const DynamicRating = ({ rating }) => {
  // Maximum number of stars you want to display
  const maxStars = 5;

  // Create an array to hold the star icons
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    // Add filled stars or outline stars based on the rating value
    if (i <= rating) {
      stars.push(<MdOutlineStar key={i} />);
    } else {
      stars.push(<MdOutlineStarOutline key={i} />);
    }
  }

  return <div className="text-base text-lightText flex items-center">{stars}</div>;
};

export default DynamicRating;
