import React, { useEffect } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet} from 'react-native'
import { Link, useRouter } from 'expo-router'
import * as SecureStore from 'expo-secure-store'


export default function index() {
    const router = useRouter()
    useEffect(() => {
    const checkLogIn = async () => {
        const access = await SecureStore.getItemAsync('access')
        if (access) {
            router.replace('/(tabs)/(home)')
        }
    }
    checkLogIn()
    },[])
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.title}>¡Bienvenido a Agendame!</Text>
        <View style={styles.section}>
        <Link  href='/login' asChild >
            <Pressable>
                <Text style={[styles.button, styles.bgBlue]}>Iniciar sesion</Text>
            </Pressable>
        </Link> 
        <Link  href='/register' asChild >
            <Pressable>
                <Text style={[styles.button, styles.bgOutline]}>No tenes cuenta, registrate</Text>
            </Pressable>
        </Link>
        <Link href='/confirmacion' >Confirmacion</Link>
        </View>
         
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    section:{

    },
    button: {
        fontSize: 15,
        fontWeight: 'bold',
        padding: 10,
        borderRadius: 10,
    },
    bgBlue:{
        backgroundColor: 'blue',
        color: 'white',
    },
    bgOutline:{
        backgroundColor: 'white',
        color: 'blue',
        borderWidth: 1,
        borderColor: 'blue',
    }
})

