import {View, Text, StyleSheet, Pressable, SafeAreaView} from 'react-native'
import {Link} from 'expo-router'
// COMPONENTS
import {LogInForm} from '../../../components/login/LogInForm'

export default function index() {
  return (
    <SafeAreaView style={styles.container}>
        <LogInForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    }, 
    tittle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    Button: {
        backgroundColor: '#4DA1A9'
    }
})
