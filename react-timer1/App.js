import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';

const Countdown = () => {
  const [basis, setBasis] = useState();
  const [timer, setTimer] = useState();
  const [textInput, setTextInput] = useState();
  const [timerDisp, setTimerDisp] = useState(0);
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

  return (
    <View>
      <Text>{timerDisp}</Text>
      <Pressable
        onPress ={() => {
          var t = new Date();
          t.setSeconds(t.getSeconds() + 50);
          setBasis(t.valueOf());
        }}
      >
        <Text style={styles.timerText}>{`Start 10s timer: ${timerDisp}`}</Text>
      </Pressable>
      <TextInput style={styles.input} placeholder='Set timer here:'>{textInput}</TextInput>
      {/* <Button>reset timer</Button> */}
    </View>
  )
};

const styles = StyleSheet.create({
  timerText: {
    padding: 30,
    backgroundColor: '#FFC0CB',
    display: 'flex',
  },

  input: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 8,
    borderColor: '#F0F0F0',
    borderWidth: 2,
    alignContent: 'center',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    // marginHorizontal: 4,
    // marginVertical: 16
  },
})

export default Countdown;