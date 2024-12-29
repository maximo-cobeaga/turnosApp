import {View, Text} from 'react-native'
import {Link} from 'expo-router'

export default function register() {
  return (
    <View>
        <Text>Este es el Registro de usuarios</Text>
        <Link href='/'>Ir a inicio</Link>
        <Link href='/login'>Ir a iniciar sesion</Link>
    </View>
  )
}
