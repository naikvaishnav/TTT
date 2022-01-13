import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';

export default function App() {
  const [boxArr] = useState([1,2,3,4,5,6,7,8,9]);
  const [resultCombinations] = useState([[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]]);
  const [isPlayer1, setIsplayer1] = useState(true);
  const [player1Ticks, setPlayer1Ticks] = useState([]);
  const [player2Ticks, setPlayer2Ticks] = useState([]);
  const [winner, setWinner] = useState('');


  const checkCombination = (arr) => {
    if(arr.length >= 3) {
      for(let i=0; i<resultCombinations.length; i++) {
        if(arr.sort().toString() == resultCombinations[i].toString()){
          setWinner(isPlayer1 ? 'Player 1' : 'Player 2');
          break;   
        } 
      }
    }
  }

  const onTick = (item) => {
    if(isPlayer1) {
      const newArr = [...player1Ticks, item];
      checkCombination(newArr)
      setPlayer1Ticks([...player1Ticks, item]);
    }else{
      const newArr = [...player2Ticks, item];
      checkCombination(newArr)
      setPlayer2Ticks(newArr);
    }
    setIsplayer1(!isPlayer1)
  }
  
  return (
    <View>
      <View style={styles.playerlist}>
        <Text style={[styles.activePlayer, {color: isPlayer1 ? 'green' : 'gray'}]}>Player 1</Text>
        <Text style={[styles.activePlayer, {color: isPlayer1 ? 'gray' : 'green'}]}>Player 2</Text>
      </View>
      <View style={styles.container}>
        {boxArr.map((item, i)=>{
          let extraprops = {};
          if(player1Ticks.indexOf(item) > -1){
            extraprops = {backgroundColor: 'red'}
          }
          if(player2Ticks.indexOf(item) > -1){
            extraprops = {backgroundColor: 'black'}
          }
          return <TouchableHighlight key={item} style={[styles.box, extraprops]} onPress={() => onTick(i+1)}>
                    <View style={{flex: 1}} />
                </TouchableHighlight>
        })}
      </View>
      <View>
        <Text style={styles.winner}>{`Winner is: ${winner}`}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flexDirection: 'row', alignContent: 'center', justifyContent: 'center', backgroundColor: '#ffffff', flexWrap: 'wrap'},
  playerlist:{flexDirection: 'row', justifyContent: 'space-around', margin: 80},
  box: {borderWidth: 1, borderColor: 'gray', width: '26%', height: 80},
  activePlayer:{fontSize: 20, fontWeight: 'bold'},
  winner: {fontSize: 30, fontWeight: 'bold', color: '#00ff00', textAlign: 'center', marginTop: 15}
});
