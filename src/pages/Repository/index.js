import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

const Repository = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { username, url } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, []);

  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

export default Repository;
