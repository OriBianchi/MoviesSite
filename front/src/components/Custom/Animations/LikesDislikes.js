import React, { useEffect } from "react";
import "./LikesDislikes.css"; // Import the CSS file for styling

const LikesDislikes = () => {
  useEffect(() => {
    // Get random number between 2 ranges
    const randomNum = (m, n) => {
      m = parseInt(m);
      n = parseInt(n);
      return Math.floor(Math.random() * (n - m + 1)) + m;
    };

    const LikesDislikes = () => {
      const $this = document.querySelector(".effect-text");
      const heartCount = ($this.offsetWidth / 50) * 1;
      for (let i = 0; i < heartCount; i++) {
        const heartSize = randomNum(100, 200) / 10;
        const tinyHeart = document.createElement("span");
        tinyHeart.className = "tiny-heart";
        tinyHeart.style.top = randomNum(40, 80) + "%";
        tinyHeart.style.left = randomNum(0, 100) + "%";
        tinyHeart.style.width = heartSize + "px";
        tinyHeart.style.height = heartSize + "px";
        tinyHeart.style.animationDelay = "-" + randomNum(0, 3) + "s";
        tinyHeart.style.animationDuration = randomNum(2, 5) + "s";
        $this.appendChild(tinyHeart);
      }
    };

    LikesDislikes();
  }, []);

  return (
    <div className="effect-text">
      <img
        alt="..."
        className="img-fluid floating"
        src={require("assets/img/theme/movie.png")}
      />
    </div>
  );
};

export default LikesDislikes;
