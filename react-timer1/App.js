import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

const Countdown = () => {
  const [basis, setBasis] = useState();
  const [timer, setTimer] = useState();
  const [timerInput, setTimerInput] = useState(10);
  const [timerDisp, setTimerDisp] = useState(10);
  const [intervalId, setIntervalId] = useState()

  useEffect(() => {
    let _intervalId;
    if (basis)
      _intervalId = setInterval(() => {
        setTimer(new Date().valueOf());
      }, 100)
      setIntervalId(_intervalId)
    return () => {
      clearInterval(_intervalId)
    }
  }, [basis])


  useEffect(() => {
    if (basis && timer) {
      const toDisp = Math.floor((basis - timer) / 1000)
      if (timerDisp !== toDisp) {
        setTimerDisp(toDisp)
      }
    }
  }, [timer])


  useEffect(() => {
    if (timerDisp <= 0) {
      clearInterval(intervalId);
    }
  }, [timerDisp])

  function timerInputHandler(enteredText) {
    setTimerInput(enteredText);
    clearInterval(intervalId);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.timerPressable}
        onPress ={() => {
          var t = new Date();
          setBasis(t.valueOf() + timerInput * 1000);
        }}
      >
        <Text style={styles.timerText}>{`Start ${timerInput} s timer:\n ${timerDisp}`}</Text>
      </Pressable>
      <TextInput style={styles.input} placeholder='Set timer here:' onChangeText={timerInputHandler} value={timerInput}/>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  timerText: {
    padding: 20,
    backgroundColor: '#FFC0CB',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },

  timerPressable: {
    width: 200
  },

  input: {
    borderRadius: 8,
    borderColor: '#F0F0F0',
    borderWidth: 2,
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
})

export default Countdown;