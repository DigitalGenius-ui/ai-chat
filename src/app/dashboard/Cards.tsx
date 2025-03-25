"use client";

import React from "react";
import Card from "./Card";
import { coatchingOptions } from "./data";

function Cards() {
  return (
    <div className="cards gap-5 md:gap-13 pt-2.5 pb-9">
      {coatchingOptions.map((item, i) => (
        <Card key={item.coatchingOption} item={item} index={i} />
      ))}
    </div>
  );
}

export default Cards;
