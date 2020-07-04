import React, { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import WebView from 'react-native-webview';

const Repository = () => {
  const route = useRoute();
  const navigation = useNavigation();

  const { name, url } = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  return <WebView source={{ uri: url }} style={{ flex: 1 }} />;
};

export default Repository;
