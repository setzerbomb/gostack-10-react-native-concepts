import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Avatar,
  Name,
  Bio,
  Header,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Loader,
} from './styles';

const User = () => {
  const [stars, setStars] = useState([]);
  const [page, setPage] = useState(1);
  const [loadable, setLoadable] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();
  const route = useRoute();

  const { user } = route.params;

  async function proccess(page) {
    const extract = ({ id, name, owner, html_url: url }) => {
      return { id, name, owner, url };
    };

    setLoading(true);

    const { data } =
      (await api.get(`/users/${user.login}/starred?page=${page}`)) || [];

    if (data.length > 0) {
      setStars(
        page === 1 ? [...data.map(extract)] : [...stars, ...data.map(extract)]
      );
    } else {
      setLoadable(false);
    }
    setLoading(false);
  }

  useEffect(() => {
    navigation.setOptions({
      title: user.name,
    });

    proccess(page);
  }, [user]);

  useEffect(() => {
    proccess(page);
  }, [page]);

  return (
    <Container>
      {user && (
        <>
          <Header>
            <Avatar source={{ uri: user.avatar }} />
            <Name>{user.name}</Name>
            <Bio>{user.bio}</Bio>
          </Header>
          <>
            {loading && page === 1 ? (
              <Loader size="large" color="#7159c1" />
            ) : (
              <>
                <Stars
                  onEndReached={() => {
                    if (loadable) {
                      setPage(page + 1);
                    }
                  }}
                  onEndReachedThreshold={0.2}
                  data={stars}
                  keyExtractor={(star) => String(star.id)}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('Repository', {
                          name: item.name,
                          url: item.url,
                        });
                      }}
                    >
                      <Starred>
                        <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                        <Info>
                          <Title>{item.name}</Title>
                          <Author>{item.owner.login}</Author>
                        </Info>
                      </Starred>
                    </TouchableOpacity>
                  )}
                />
                {loading && page > 1 && loadable && (
                  <ActivityIndicator size="large" color="#7159c1" />
                )}
              </>
            )}
          </>
        </>
      )}
    </Container>
  );
};

export default User;
