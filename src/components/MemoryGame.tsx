"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import postToMyBestApi from "@/api/services/postToMyBestApi";
import useFetchFromMyBest from "@/hooks/api-hook/useFetchFromMyBest";
import useFetchFromGlobalBest from "@/hooks/api-hook/useFetchFromGlobalBest";
import fetchFromMyBestApi from "@/api/services/fetchFromMyBestApi";
import { Button } from "./commons/button";
import { InfoBox } from "./commons/infoBox";

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
    if (!flipped.includes(index) && flipped.length < 2) {
      setClickCount(clickCount + 1);
      setFlipped([...flipped, index]);
    }
  };

  const gameOver = solved.length === cards.length;

  if (gameOver) {
    if (clickCount !== 0 && myBestScore && clickCount < myBestScore) {
      postToMyBestApi({
        createdAt: Date.now(),
        myBestScore: clickCount,
        id: "1",
      });
      setMyBestScore(clickCount);
    }
  }

  const resetGame = async () => {
    setCards(generateDeck());
    setFlipped([]);
    setSolved([]);
    setClickCount(0);
    await fetchFromMyBestApi();
  };

  return (
    <div>
      <h1 className="text-center py-8 text-2xl text-white underline decoration-purple-300 decoration-2 font-bold">
        Memory Game
      </h1>
      <InfoBox>Click Count: {clickCount}</InfoBox>
      <InfoBox>My Best Score: {myBestScore}</InfoBox>
      <InfoBox>Global Best Score: {globalBest[0]?.globalBestScore}</InfoBox>
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
                src={`/images/${card}.png`}
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
      <Button onClick={() => resetGame()}>Restart</Button>
    </div>
  );
}
