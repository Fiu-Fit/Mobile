import React from 'react';
import {ScrollView} from 'react-native';
import {Card, Paragraph} from 'react-native-paper';
import NavBar from '../../components/navBar';


// const HomeScreen = ({navigation}: {navigation: any}) => (
//   <View style={styles.container}>
//     <View style={styles.homeItem}>
//       <Text style={styles.textStyle}>HOME</Text>
//     </View>
//     <View style={styles.homeItem}>
//       <Button title="Sign In" onPress={() => navigation.push('Login')} />
//     </View>
//     <View style={styles.homeItem}>
//       <Button
//         title="Create Account"
//         onPress={() => navigation.push('Register')}
//       />
//     </View>
//   </View>
// );

const cards = [
  {title: 'Card 1', content: 'card 1'},
  {title: 'Card 2', content: 'card 2'},
  {title: 'Card 3', content: 'card 3'},
  {title: 'Card 4', content: 'card 4'},
  {title: 'Card 5', content: 'card 5'},
  {title: 'Card 6', content: 'card 6'},
  {title: 'Card 7', content: 'card 7'},
  {title: 'Card 8', content: 'card 8'},
  {title: 'Card 9', content: 'card 9'},
  {title: 'Card 10', content: 'card 10'},
];

const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <>
      <NavBar />
      <ScrollView>
        {cards.map((card, index) => (
          <Card key={index}>
            <Card.Title title={card.title} />
            <Card.Content>
              <Paragraph>{card.content}</Paragraph>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
};

export default HomeScreen;
