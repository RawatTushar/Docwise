import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Keyboard,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { getToken, getFacilityUserwise } from '../../shared/api/ApiFile';
import LoginIdPasswordContainer from '../../shared/LoginIdPasswordContainter';
import LoginPasswordContainer from '../../shared/LoginPasswordContainer';
import ButtonComponent from '../../shared/ButtonComponent';


const Login = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [encryption, setEncryption] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const onUserLogin = async () => {
    if (username.trim().length === 0) {
      Alert.alert('Validation', 'UserID is required');
      return;
    }
    if (password.trim().length === 0) {
      Alert.alert('Validation', 'Password is required');
      return;
    }
    

    setIsLoading(true);
    const tokenResponse = await getToken(username, password);
    if (!tokenResponse || !tokenResponse.userid || !tokenResponse.access_token) {
      Alert.alert('Login failed', tokenResponse?.message || 'Invalid credentials');
      setIsLoading(false);
      return;
    }

    const facilityData = await getFacilityUserwise(tokenResponse.userid, tokenResponse.access_token);
    setIsLoading(false);

    if (!facilityData || facilityData.length === 0) {
      Alert.alert('Login failed', 'Facility data not available');
      return;
    }

    navigation.navigate('Facility', { facilities: facilityData });
  };

  const onPressEye = () => setEncryption(!encryption);

  return (
    <ImageBackground
      style={styles.background}
      source={{ uri: 'https://via.placeholder.com/800x1400' }}>
      <KeyboardAwareScrollView contentContainerStyle={styles.wrapper}>
        <View style={styles.form}>
          <Text style={styles.title}>MOBIHISTREE LOGIN</Text>
          <LoginIdPasswordContainer
            placeholder="UserID"
            value={username}
            onChange={setUsername}
          />
          <LoginPasswordContainer
            placeholder="Password"
            value={password}
            onChange={setPassword}
            secureTextEntry={encryption}
            usePasswordEye={
              <TouchableOpacity onPress={onPressEye} style={styles.eyeButton}>
                <Text style={styles.eyeText}>{encryption ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            }
          />
          <ButtonComponent
            title={isLoading ? 'Logging in...' : 'LOGIN'}
            onPressEvent={onUserLogin}
            disabled={isLoading}
            extraStyles={styles.loginButton}
          />
        </View>
      </KeyboardAwareScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  wrapper: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  form: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: '#111',
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    height: 32,
    justifyContent: 'center',
  },
  eyeText: {
    color: '#1c6df0',
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 16,
  },
});

export default Login;
