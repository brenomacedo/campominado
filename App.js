import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import ImageScreen from './assets/imgs/bomb.png'

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  Image
} from 'react-native';


import params from './src/Params'
import MineField from './src/components/MineField'
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed
} from './src/functions'

import Header from './src/components/Header'
import LevelSelection from './src/screens/LevelSelection'

class Game extends React.Component{

  constructor(props){
    super(props)

    this.state = this.createState()
  }

  minesAmount = () => {
    const cols = params.getColumnsAmount()
    const rows = params.getRowsAmount()

    return Math.ceil(cols * rows * params.difficultLevel)
  }

  createState = () => {
    const rows = params.getRowsAmount()
    const cols = params.getColumnsAmount()

    return {
      board : createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
      showLevelSelection: false
    }
  }

  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board)
    openField(board, row, column)
    const lost = hadExplosion(board)
    const won = wonGame(board)

    if(lost) {
      showMines(board)
      Alert.alert('PERDESTE :(', 'FODAR :P')
    }

    if(won) {
      Alert.alert('GANHASTE :)', 'MUITO BEM !')
    }

    this.setState({
      board, lost, won
    })
  }

  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board)
    invertFlag(board, row, column)
    const won = wonGame(board)
    if(won) {
      Alert.alert('Parabens!', 'Você venceu!')
    }
    this.setState({
      board,
      won
    })
  }

  onLevelSelected = level => {
    params.difficultLevel = level
    this.setState(this.createState())
  }

  render(){
    return (
        <View style={styles.container}>
          <LevelSelection onCancel={() => this.setState({ showLevelSelection: false })} onLevelSelected={this.onLevelSelected} isVisible={this.state.showLevelSelection}></LevelSelection>
          <Header onFlagPress={() => this.setState({ showLevelSelection: true })} onNewGame={() => this.setState(this.createState())} flagsLeft={this.minesAmount() - flagsUsed(this.state.board)} />
          <View style={styles.board}> 
            <MineField board={this.state.board} onOpenField={this.onOpenField} onSelectField={this.onSelectField} />
          </View>
        </View>
    );
  }
}

class SplashScreen extends React.Component {

  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.navigate('game')
    }, 2000)
  }

  render() {
    return (
      <View style={styles.splashContainer}>
        <Image source={ImageScreen} style={styles.image} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  board: {
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 120,
    height: 120
  }
})

const Switch = createStackNavigator()


export default class App extends React.Component{
  render() {
    return (
      <NavigationContainer>
        <Switch.Navigator headerMode={false} initialRouteName='splash'>
          <Switch.Screen name='splash' component={SplashScreen} />
          <Switch.Screen name='game' component={Game} />
        </Switch.Navigator>
      </NavigationContainer>
    )
  }
}
