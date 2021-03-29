import React from "react";
import "./MyRating.css";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarHalfIcon from "@material-ui/icons/StarHalf";

interface props {
  rating: number | undefined;
  reviews: number | undefined;
}

const getHoleStarts = (num: number) => {
  let stars = Math.floor(num);
  let starsArray = [];
  for (var i = 0; i < stars; i++) {
    starsArray.push(<StarIcon />);
  }

  return starsArray;
};
const getHalfStars = (num: number) => {
  let halfStars = num - Math.floor(num);
  let halfStarArray = [];
  for (var i = 0; i < halfStars; i++) {
    halfStarArray.push(<StarHalfIcon />);
  }

  return halfStarArray;
};

const getEmptyStars = (num: number) => {
  console.log("Num: " + num);
  let empty = 5 - num;
  let emptyStarsArray = [];
  if (empty >= 1) {
    for (var i = 0; i < empty; i++) {
      emptyStarsArray.push(<StarBorderIcon />);
    }
  }
  return emptyStarsArray;
};

const MyRating: React.FC<props> = ({ rating, reviews }) => {
  return (
    <div>
      {rating === 0 ? (
        <div className="rating">
          <div className="rating__empty">{getEmptyStars(rating)}</div>
          {reviews !== undefined && (
            <div className="reviews">{`(${reviews} reviews)`}</div>
          )}
        </div>
      ) : (
        <div>
          <div className="rating">
            {console.log("rating: " + rating)}
            {rating && (
              <div className="rating__stars"> {getHoleStarts(rating)}</div>
            )}
            {rating && (
              <div className="rating__half">{getHalfStars(rating)}</div>
            )}
            {rating && (
              <div className="rating__empty">{getEmptyStars(rating)}</div>
            )}
            {reviews !== undefined && (
              <div className="reviews">{`(${reviews} reviews)`}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyRating;
