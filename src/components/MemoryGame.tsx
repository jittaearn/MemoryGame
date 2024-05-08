"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import postToMyBestApi from "@/api/services/postToMyBestApi";
import useFetchFromMyBest from "@/hooks/api-hook/useFetchFromMyBest";
import useFetchFromGlobalBest from "@/hooks/api-hook/useFetchFromGlobalBest";
import fetchFromMyBestApi from "@/api/services/fetchFromMyBestApi";

const generateDeck = () => {
  const memoryCards = [
    "cherries",
    "chili",
    "grapes",
    "lemon",
    "orange",
    "pineapple",
  ];

  const deck = [...memoryCards, ...memoryCards];
  return deck.sort(() => Math.random() - 0.5);
};

export default function MemoryGame() {
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  const [clickCount, setClickCount] = useState<number>(0);
  const { myBest } = useFetchFromMyBest();
  const [myBestScore, setMyBestScore] = useState<number>();
  const { globalBest } = useFetchFromGlobalBest();

  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;

      if (cards[first] === cards[second]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [cards, flipped, solved]);

  useEffect(() => {
    setMyBestScore(myBest[0]?.myBestScore);
  }, [myBest]);

  const handleClick = (index: number) => {
    setClickCount(clickCount + 1);
    if (!flipped.includes(index) && flipped.length < 2)
      setFlipped([...flipped, index]);
  };

  const gameOver = solved.length === cards.length;

  if (gameOver) {
    if (clickCount !== 0 && clickCount < myBest[0]?.myBestScore) {
      postToMyBestApi({
        createdAt: Date.now(),
        myBestScore: 26,
        id: "1",
      });
    }
  }

  const resetGame = () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
    setClickCount(0);
  };

  return (
    <div>
      <h1 className="text-center py-8 text-2xl text-white underline decoration-purple-300 decoration-2 font-bold">
        Memory Game
      </h1>
      <div className="bg-blue-300 rounded text-white text-center p-2 mb-4">
        Click Count: {clickCount}
      </div>
      <div className="bg-blue-300 rounded text-white text-center p-2 mb-4">
        My Best Score: {myBestScore}
      </div>
      <div className="bg-blue-300 rounded text-white text-center p-2 mb-4">
        Global Best Score: {globalBest[0]?.globalBestScore}
      </div>
      <h2 className="p-4 text-slate-600 justify-center items-center flex mb-4">
        {gameOver ? "Congratulation! You Won!" : ""}
      </h2>
      <div className="grid grid-cols-4 justify-between gap-4">
        {cards.map((card, index) => (
          <div
            className={`flex justify-center text-4xl font-bold items-center text-black w-20 h-20 transform cursor-pointer transition-transform duration-300 border-4 border-white bg-yellow-100 ${
              flipped.includes(index) || solved.includes(index)
                ? "rotate-180"
                : ""
            }`}
            key={index}
            onClick={() => handleClick(index)}
          >
            {flipped.includes(index) || solved.includes(index) ? (
              <Image
                className="rotate-180 p-2"
                src={`/memory-cards/${card}.png`}
                alt="Memory Card"
                width={100}
                height={100}
              />
            ) : (
              <p className="text-slate-500">?</p>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={() => resetGame()}
        className="p-4 bg-purple-300 rounded-md text-white flex mt-5"
      >
        Restart
      </button>
    </div>
  );
}
