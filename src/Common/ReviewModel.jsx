import React, { useState } from "react";
//import { Rating } from "react-simple-star-rating";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

function getRating(rating) {
  switch (rating) {
    case 1:
      return "Poor";
    case 2:
      return "Nothing special";
    case 3:
      return "Average";
    case 4:
      return "Very good";
    case 5:
      return "Excellent";
    default:
      return "None";
  }
}

const ReviewModel = ({ allmodel, setallmodel, handleSubmitReview }) => {
  console.log("all model", allmodel);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleRating = (number) => {
    console.log("called");
    setallmodel((prev) => ({
      ...prev,
      rating: number,
    }));
    // setRating(number);
    // // other logic
  };

  const handleComment = (data) => {
    setallmodel((prev) => ({
      ...prev,
      comment: data,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitReview();
  };

  return (
    <div
      className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative max-w-2xl w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
              Discussion (20)
            </h2>
          </div>

          {/* Horizontal Rating Component */}
          <div className="flex items-center mb-4 space-x-4">
            <span className="text-lg text-gray-900 dark:text-white">
              Your Rating:
            </span>

            <Rating
              style={{ maxWidth: 180 }}
              onChange={handleRating}
              value={allmodel.rating}
              size={25} // Adjust the size of the stars
              transition // Smooth animation on hover
              fillColor="yellow" // Star fill color
              emptyColor="gray" // Empty star color
              onHoverChange={setHoveredRating}
            />

            <span className="text-sm text-gray-500 dark:text-gray-400">
              {allmodel.rating} / 5
            </span>
          </div>

          <div>{`${getRating(hoveredRating)}`}</div>

          <div className="py-2 px-4 mb-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              onChange={(e) => handleComment(e.target.value)}
              rows="6"
              value={allmodel.comment}
              className="w-full px-0 text-sm text-gray-900 dark:text-white dark:placeholder-gray-400 bg-transparent focus:outline-none"
              placeholder="Write a comment..."
              required
            ></textarea>
          </div>
          <div className="text-right">
            <button
              onClick={handleSubmit}
              type="submit"
              className="inline-flex items-center py-2.5 px-6 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 transition"
            >
              Add Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModel;
