import React, {useEffect} from 'react'
import {View, Text, StyleSheet, Pressable, SafeAreaView, Alert} from 'react-native'
import {useRouter} from 'expo-router'
import * as SecureStore from 'expo-secure-store'
// COMPONENTS

export default function index() {
    const router = useRouter()

    useEffect(() => {
        const checkLogIn = async () => {
            const access = await SecureStore.getItemAsync('access')
        }
        checkLogIn()
    },[])

    const logOut = async () => {
        await SecureStore.deleteItemAsync('access')
        Alert.alert('Exito!', 'Se cerro sesion correctamente')
        router.replace('/login')
    }

    return (
    <SafeAreaView style={styles.container}>
            <Text>El usuario inicio sesion</Text>
            <Pressable onPress={logOut}>
                <Text style={styles.button}>Cerrar sesion</Text>
            </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }, 
    button: {
        backgroundColor: 'red',
        color: 'white',
        padding: 10,
        height: 40,
        borderRadius:10,
    }
})
