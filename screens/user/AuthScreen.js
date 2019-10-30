import React, {
  useState,
  useReducer,
  useCallback,
} from "react";
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from "react-native";
import Colors from "../../constants/Colors";
import { Button, Input, Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { TouchableOpacity } from "react-native-gesture-handler";
import flashMessage from '../../message';


const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const CLEAR_FORM = 'CLEAR_FORM';
const ON_TOUCHED = 'ON_TOUCHED';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let updatedFormIsValid = true;
    //loop through all key values to see if they are valid
    for (const key in updatedValues) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
    }

    return {
      updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid
    }
  }
  if (action.type == CLEAR_FORM) {
    return {
      inputValues: {
        email: '',
        password: '',
        message: ''
      },
      inputValidities: {
        email: false,
        password: false,
        message: false
      },
      formIsValid: false
    }
  }
  return state;
}

const touchedReducer = (state, action) => {

  if (action.type === ON_TOUCHED) {
    if (action.input == 'email') {
      return {
        ...state,
        emailTouched: true
      }
    }
  }
  if (action.input == 'password') {
    return {
      ...state,
      passwordTouched: true
    }
  }
  return state;
}

const AuthScreen = (props) => {

  const [formState, dispatchFormState] = useReducer(formReducer,
    {
      inputValues: {
        email: '',
        password: '',
        message: ''
      },
      inputValidities: {
        email: false,
        password: false,
        message: false
      },
      formIsValid: false
    }
  );

  const [touchedState, dispatchTouchedState] = useReducer(touchedReducer,
    {
      emailTouched: false,
      passwordTouched: false
    }
  );

  const dispatch = useDispatch();
  // use for both signUp and sign
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUser, setIsUser] = useState(
    useSelector(state => state.auth).isLoggedIn
  );
  const showError = message => {
    flashMessage(message, Colors.textLight, Colors.error, 'bottom');
  };
  
  const textChangeHandler = useCallback(
    (inputIdentifier, text) => {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      let isValid = true;
      inputIdentifier === 'email' && !emailRegex.test(text)
        ? isValid = false : true;
      inputIdentifier === 'password' && text.length < 6
        ? isValid = false : true;

      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid: isValid,
        input: inputIdentifier
      })
    }, [dispatchFormState])

  const authHandler = async () => {

    if (formState.inputValues.email == '' ||
      formState.inputValues.password == '') {
      flashMessage('please enter all fields', Colors.textLight, Colors.error, 'bottom');
      return;
    }
    if (!formState.inputValidities.password || !formState.inputValidities.email) {
      flashMessage('please check your errors', Colors.textLight, Colors.error, 'bottom');
      return;
    }
    let action;
    if (isSignUp) {
      action = authActions.signUp(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.signIn(
        formState.inputValues.email,
        formState.inputValues.password
      )
    };

    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Home');
      setIsLoading(false);
      let successMessage = 'Successfully Signed Up';
      if (!isSignUp) { // if not signed up then it was sign in
        successMessage = 'Successfully Signed In';
      }
      flashMessage(successMessage, Colors.textLight, Colors.primary);

      //delay to show logout button
      setTimeout(() => (
        setIsUser(true)
      ), 2000);

    } catch (error) {
      showError(error.message);
      setIsLoading(false);
    }
  };

  const focusHandler = useCallback(
    (id) => {
      dispatchTouchedState({
        type: ON_TOUCHED, input: id
      });
    },
    [dispatchTouchedState],
  );


  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={50}
        style={styles.content}
      >
        {!isUser ?
          <View style={styles.authContainer}>
            <View style={styles.formHeader}>
              <Text style={styles.title}> {isSignUp ? 'Sign Up' : 'Sign In'} </Text>
              <TouchableOpacity style={styles.marginButtonTop} onPress={() => {
                props.navigation.navigate('Home')
              }} >
                <View><Text style={styles.bold}>X</Text></View>
              </TouchableOpacity>
            </View>
            <Input    ///-----------------send email as input identifier
              onChangeText={textChangeHandler.bind(this, 'email')}
              value={formState.inputValues.email}
              autoCapitalize='none'
              placeholder='email'
              leftIcon={
                <Icon iconStyle={styles.icon} type='font-awesome' name='envelope' size={24} color={Colors.accent} />
              }
              onFocus={focusHandler.bind(this, 'email')}
              errorStyle={Colors.error}
              errorMessage={touchedState.emailTouched
                && !formState.inputValidities.email
                ? 'please enter a valid email' : null}
            />
            <Input///-----------------send password as input identifier
              onChangeText={textChangeHandler.bind(this, 'password')}
              secureTextEntry
              type='password'
              placeholder='password'
              value={formState.inputValues.password}
              autoCapitalize='none'
              leftIcon={
                <Icon iconStyle={styles.icon} type='font-awesome' name='lock' size={34} color={Colors.accent}
                />
              }
              onFocus={focusHandler.bind(this, 'password')}
              errorStyle={Colors.error}
              errorMessage={touchedState.passwordTouched
                && !formState.inputValidities.password
                ? 'please enter a password over 5 characters' : null}
            />

            {isLoading ? <ActivityIndicator size='small'
              color={Colors.primary}
            /> :
              <Button
                containerStyle={styles.margin}
                title='Submit'
                onPress={authHandler} />}
            <TouchableOpacity onPress={() => { setIsSignUp(prevState => !prevState) }} >
              <Text style={styles.bottomMessage}>{isSignUp ? 'already user? sign in' : 'do not have an account? sign up'} </Text>
            </TouchableOpacity>
          </View>

          :
          <View style={styles.btn}>
            <Button
              icon={
                <Icon
                  type='font-awesome'
                  name="sign-out"
                  size={23}
                  color={Colors.primary}
                  containerStyle={{ marginRight: 10 }}
                />
              }
              title='LOG OUT'
              onPress={() => {
                setIsUser(false);
                dispatch(authActions.logout())
              }} />
          </View>}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

var styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height / 8)
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: (Dimensions.get('window').height / 5)
  },
  title: {
    marginLeft: 20,
    color: Colors.dark,
    fontSize: 20
  },
  formHeader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 5
  },
  bottomMessage: {
    alignSelf: "center",
    color: 'blue'
  },
  screen: {
    flex: 1
  },
  authContainer: {
    width: '90%',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 18
  },
  buttonContainer: {
    marginTop: 10
  },
  bold: {
    fontWeight: 'bold'
  },
  margin: {
    margin: 10
  },
  icon: {
    marginRight: 10
  },
  marginButtonTop: {
    marginTop: 3
  }

});

AuthScreen.navigationOptions = {
  headerTitle: 'User',
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTintColor: Colors.textLight
}


export default AuthScreen;
