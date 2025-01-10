import {View, Text, StyleSheet} from 'react-native'
import {Link} from 'expo-router'

export function HelpSection() {
  return (
    <View style={styles.helpSection}>
                <Link href='/' asChild>
                    <Text style={{
                        color: '#2E5077',
                        textAlign: 'center',
                        fontSize: 15,
                        margin: 5,
                    }}>
                        Lee nuestros <Text style={{fontWeight: 'bold'}}>términos y condiciones</Text>{'\n'} y <Text style={{fontWeight: 'bold'}}>políticas de privacidad</Text>
                    </Text>
                </Link>
                <Link href='/' asChild>
                    <Text style={{
                        color: '#2E5077',
                        textAlign: 'center',
                        fontSize: 15,
                        margin: 5,
                        fontWeight: 'bold',
                    }}>
                        ¿Necesitas ayuda? <Text style={{textDecorationLine: 'underline'}}>Contáctanos aquí</Text>
                    </Text>
                </Link>
            </View>
  )
}
const styles = StyleSheet.create({
    helpSection:{
        flex: 0.2,
        justifyContent: 'center',
        alignItems: 'center',  
    }
})
