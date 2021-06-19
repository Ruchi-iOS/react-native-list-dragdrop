/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ScrollView, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import { DraxProvider, DraxView, DraxList } from 'react-native-drax';  
import Board from './src/components/Board'
import RowRepository from './src/lib/RowRepository'


export default class App extends Component {

  constructor(props) {
    super(props);
    const data = [
      {
        id: 1,
        name: 'A',
        rows: [
          { id: 1, name: 'Item1', c: 1 },
          { id: 2, name: 'Item2',c: 1 },
          { id: 3, name: 'Item3',c: 1},

        ]
      },
      {
        id: 2,
        name: 'B',
        rows: [
          { id: 4, name: 'Item4' ,c: 2}
        ]
      },

    ];
    this.state = {
       rowRepository: new RowRepository(data)
    };

  }


  renderRow(item,index,columnid) {
    let style = [styles.item];
    // Just to show that other sizes works as well
    // if (itemm.id == 2) {
    //   style.push({ height: 100 });
    // }
    // let available = false;
    // data.map((item,index) => {
    //   let av = item.rows.findIndex(obj => obj.id == item.id)
    //   if (av)
    //   {
    //     if (index == 1)
    //     {
    //       available = true
    //     }
    //   }
    // })


    console.log("item...", item)
    return (
      <View style={style}>
        {
          columnid == 2 &&
          <View style={{ backgroundColor: 'red', justifyContent: 'center', alignSelf: 'flex-start', alignItems: 'center', height: 20, width: 15 }}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>{index + 1}</Text>
        </View>
        }
       
        <Image source={require('./assets/adjust.png')} />
        <Text>{item.name}</Text>
      </View>
    )
  }

  renderColumnWrapper(column, index, columnComponent) {
    return (
      <View key={`column-${index}`} style={styles.column}>
        <Text style={styles.columnHeader}>{column.name}</Text>

        {columnComponent}


      </View>
    );
  }

  onOpen(item) {
    console.log('Opened!', item);
  }

  onDragEnd(srcColumnId, destColumnId, item) {
    console.log(`Dragged item ${item.id()} from column ${srcColumnId} to column ${destColumnId}`);
  }


  render() {

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <Board
          style={styles.board}
          rowRepository={this.state.rowRepository}
          renderRow={this.renderRow.bind(this)}
          renderColumnWrapper={this.renderColumnWrapper.bind(this)}
          open={this.onOpen.bind(this)}
          onDragEnd={this.onDragEnd.bind(this)}
        />
      </View>


    );
  }
}
const styles = StyleSheet.create({
  board: {
    flex: 1,
    padding: 15,
    backgroundColor: '#63A2B8',
  },
  column: {
    width: 300,
    margin: 10,
    padding: 10,
    backgroundColor: '#F5FCFF',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
  },
  columnHeader: {
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    alignSelf: 'center'
  },
  item: {
    flex: 1,
    width: 70,
    margin: 5,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#63A2B8',
    borderRadius: 5,
  }
});
