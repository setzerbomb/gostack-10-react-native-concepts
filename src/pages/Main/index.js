import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Keyboard, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  ProfileButton,
  ProfileButtonText,
  Bio,
} from './styles';

const Main = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    async function proccess() {
      setUsers(JSON.parse(await AsyncStorage.getItem('users')) || []);
    }

    proccess();
  }, []);

  useEffect(() => {
    async function proccess() {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }

    proccess();
  }, [users]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const {
        data: { name, login, bio, avatar_url: avatar },
      } = await api.get(`/users/${newUser}`);

      const user = {
        name,
        login,
        bio,
        avatar,
      };

      setUsers([...users, user]);
      setNewUser('');

      setLoading(false);
      Keyboard.dismiss();
    } catch (e) {
      return Alert.alert(e.message);
    }
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeHolder="Adicionar Usuário"
          value={newUser}
          onChangeText={(text) => setNewUser(text)}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
        />
        <SubmitButton loading={loading} onPress={handleSubmit}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={(user) => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>

            <ProfileButton
              onPress={() => {
                navigation.navigate('User', { user: item });
              }}
            >
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
};

export default Main;
