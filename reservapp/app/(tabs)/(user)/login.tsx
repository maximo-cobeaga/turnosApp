import {View, Text} from 'react-native'
import {Link} from 'expo-router'

export default function login() {
  return (
    <View>
        <Text>
            Este es es inicio de sesion
        </Text>
        <Link href='/'>Ir a inicio</Link>
        <Link href='/register'>Ir a registro</Link>
    </View>
  )
}
