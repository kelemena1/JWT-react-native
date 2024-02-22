import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList,Pressable } from 'react-native';
import Login from './components/Login';
import axios from 'axios';
import Button from './components/Button';

const App = () => {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState([]); // Termékek állapota

  useEffect(() => {
    if (token) {
      fetchUserData();
    }
  }, [token]); // Token változásakor fut le

  const fetchUserData = async () => {
    try {
      const response = await axios.get('https://jwt.sulla.hu/termekek', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(response.data); // A válaszadatok beállítása a termékek állapotában
    } catch (error) {
      console.error(error);
    }
  };
  const handleLogout = () => {
    setToken(''); // Token nullára állítása, ezzel "kijelentkeztetve" a felhasználót
    setProducts([]); // Termékek törlése a kijelentkezéskor
  };
  return (
    <View style={styles.container}>
      {!token ? (
        <Login onLogin={setToken} />
      ) : (
          <> 
           
        <FlatList
        
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.price}>{`${item.price} Ft`}</Text>

            </View>
           
          )}
            
        />
          <Pressable style={[styles.button]} onPress={handleLogout}>
                  <Text style={styles.text}>kijelentkezés</Text>
            </Pressable>
         </>
      )
      
      }
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin : 20
  },
  card: {
    backgroundColor: 'lightgray',
    padding: 20,
    marginVertical: 8,
    width: 300,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black', 
    margin: 10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default App;
