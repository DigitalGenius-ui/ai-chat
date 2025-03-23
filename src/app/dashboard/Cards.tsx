"use client";

import React from "react";
import Card from "./Card";

const data = [
  {
    coatchingOption: "topic base lecture",
    img: "/lecture.png",
  },
  {
    coatchingOption: "mock interview",
    img: "/interview.png",
  },
  {
    coatchingOption: "ques & prep",
    img: "/qa.png",
  },
  {
    coatchingOption: "learn language",
    img: "/language.png",
  },
  {
    coatchingOption: "meditation",
    img: "/meditation.png",
  },
];

function Cards() {
  return (
    <div className="cards gap-2 md:gap-13 pt-2.5 pb-9">
      {data.map((item, i) => (
        <Card key={item.coatchingOption} item={item} index={i} />
      ))}
    </div>
  );
}

export default Cards;
