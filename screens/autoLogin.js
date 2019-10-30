import React, { useEffect } from 'react';
import {
  AsyncStorage
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth';

const autoLogin = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        return;
      }
      const transformedData = JSON.parse(userData);
      const { token, userId, expiryDate } = transformedData;
     
      const expirationDate = new Date(expiryDate);
      
      if (!expiryDate || expirationDate <= new Date() || !token || !userId) {
        return;
      }
      dispatch(authActions.authenticate(userId, token));
      dispatch(authActions.tokeIsStillValid(true));
    };
    tryLogin();
  }, [dispatch]);

};

export default autoLogin;