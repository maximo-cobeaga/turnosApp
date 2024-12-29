import { Link } from 'expo-router'
import {View, Text, StyleSheet} from 'react-native'

export default function details() {
  return (
    <View style={styles.container}>
        <Text>Estos son los DETAILS</Text>
        <Link href="/" >view index</Link>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
    }
})