import {View, Alert, Text, TextInput, StyleSheet, SafeAreaView} from 'react-native'
import {Link} from 'expo-router'

export default function index() {
  return (
    <View style={styles.container}>
        <Text>
            esto es INDEX
        </Text>
        <Link href="/details">View details</Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'red',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    }
})
