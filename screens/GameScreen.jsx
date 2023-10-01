import React, { useState } from "react";
import { Image, Text, View, TouchableOpacity } from "react-native";

import { styles } from "../constants/Styles";
import { nameToPic } from "../constants/Constants";
import { useEffect } from "react";
import { shuffle } from "../utils/ArrayUtils";
import { StatusBar } from "expo-status-bar";
import { Button } from "react-native-web";
const names = Object.keys(nameToPic);

export default function GameScreen() {
  // TODO: Declare and initialize state variables here, using "useState".

  const [gameOver, setGameOver] = useState(false);
  const [nextRound, setNextRound] = useState(false);
  const [currentScore, setCurrentScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [nameOptions, setNameOptions] = useState([]);

  // State for the timer is handled for you.
  const [timeLeft, setTimeLeft] = useState(5000);

  // Called by the timer every 10 seconds
  const countDown = () => {
    if (timeLeft > 0) {
      // Time still left, so decrement time state variable
      setTimeLeft(timeLeft - 10);
    } else {
      // Time has expired
      // TODO: update appropriate state variables
      setGameOver(true);
    }
  };

  // This is used in the useEffect(...) hook bound on a specific STATE variable.
  // It updates state to present a new member & name options.
  const getNextRound = () => {
    // Fetches the next member name to guess.
    let correct = names[Math.floor(Math.random() * names.length)];
    let correctName = nameToPic[correct][0];
    let correctImage = nameToPic[correct][1];

    // Generate 3 more wrong answers.
    let nameOptions = [correctName];
    while (nameOptions.length < 4) {
      let wrong = names[Math.floor(Math.random() * names.length)];
      let wrongName = nameToPic[wrong][0];
      if (!nameOptions.includes(wrongName)) {
        nameOptions.push(wrongName);
      }
    }
    nameOptions = shuffle(nameOptions);

    // TODO: Update state here.
    setTimeLeft(5000);
    setNextRound(false);
    setTotalQuestions(totalQuestions + 1);
    setNameOptions([]);
  };

  // Called when user taps a name option.
  // TODO: Update correct # and total # state values.
  const selectedNameChoice = (index) => {
    if (nameOptions[index] === nameToPic[correct][0]) {
      setCurrentScore(currentScore + 1);
    }
    setTotalQuestions(totalQuestions + 1);
    setNextRound(true);
  };

  // Call the countDown() method every 10 milliseconds.
  useEffect(() => {
    const timer = setInterval(() => countDown(), 10);
    return function cleanup() {
      clearInterval(timer);
    };
  }, [timeLeft]);

  // TODO: Finish this useEffect() hook such that we automatically
  // get the next round when the appropriate state variable changes.
  useEffect(
    () => {
      getNextRound();
    },
    [
      /* TODO: Your State Variable Goes Here */
      nextRound
    ]
  );

  // Set up four name button components
  const nameButtons = [];
  for (let i = 0; i < 4; i++) {
    const j = i;
    nameButtons.push(
      // A button is just a Text component wrapped in a TouchableOpacity component.
      <TouchableOpacity
        key={j}
        style={styles.button}
        onPress={() => selectedNameChoice(j)}
      >
        <Text style={styles.buttonText}>
          {nameOptions[j]}
        </Text>
      </TouchableOpacity>
    );
  }

  const timeRemainingStr = (timeLeft / 1000).toFixed(2);

  // Style & return the view.
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Guess the Member</Text> */}
      <StatusBar style="auto"/>
      <Text style={styles.scoreText}>Correct Answers: {currentScore}</Text>
      <Text style={styles.timerText}>Time Remaining: {timeRemainingStr} seconds</Text>
      {/* <Image source={nameToPic[currentMember][0]} style={styles.imageView} /> */}
      {/* <Image source={nameToPic[currentMember][1]} style={styles.memberImage}/> * */}
      {/* {nameButtons} */}
      {/* Hint: What does the nameButtons list above hold? 
          What types of objects is this list storing?
          Try to get a sense of what's going on in the for loop above. */}
        {/* <Image source={nameToPic[currentMember][1]} style={styles.image} /> */}

      <Button style={styles.buttom}>nameOptions[0]</Button>

        {/* {nameButtons} */}
    </View>
  );
}
