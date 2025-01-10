import {SafeAreaView, Text, Pressable, StyleSheet, View} from 'react-native'
import {Link, useRouter} from 'expo-router'

export default function confirmacion() {
    const router = useRouter()
  
    return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>¡Registro exitoso!</Text>
        <View style={styles.body}>
            <Text style={styles.text}>Hemos enviado un correo de confirmación a tu dirección de correo electrónico.</Text>
            <Text style={styles.text}>Por favor, revisa tu bandeja de entrada (y la carpeta de spam si no lo ves pronto) y haz clic en el enlace de confirmación para activar tu cuenta.</Text>

        </View>
        <Link href='/login' asChild>
            <Pressable>
                <Text style={[styles.submit, styles.bgBlue]}>Iniciar sesion</Text>
            </Pressable>
        </Link>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 20,
        gap: 20,
    },
    title: {
        margin: 10,
        fontSize: 30, 
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#2E5077"
    },
    body: {
        
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
    }, 
    submit: {
        textAlign: 'center',
        borderRadius: 10,
        padding: 10,
        height: 40,
        width: '80%',
        fontSize:15,
        fontWeight: 'bold',
        margin: 10,
    },
    bgBlue: {
        backgroundColor: '#2E5077',
        color: '#fff'
    },
    bgOutline: {
        borderColor: '#2E5077',
        borderWidth: 2,
        color: '#2E5077',
    },
})
