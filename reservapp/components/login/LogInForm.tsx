import {View, Text, TextInput, SafeAreaView, StyleSheet, Pressable, Alert, Dimensions} from 'react-native'
import {useState} from 'react'
import * as SecureStore from 'expo-secure-store'
import axios from 'axios'
import { Link } from 'expo-router'



export function LogInForm() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    
    async function save(key: string, value: string){
        await SecureStore.setItemAsync(key, value);
    }


    const handlePress = async () => {
        const instance = axios.create({
            baseURL: 'https://147e-2803-9800-9991-8751-18c7-4bdc-62bc-674a.ngrok-free.app',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const params = {
            username: username,
            password: password
        }
        
        try {
            const response = await instance.post('/api/v1/token/', params)
            save('access', response.data.access)
            Alert.alert('Exito!', 'Se inicio sesion correctamente')
        } catch (errors){
            Alert.alert('Error', 'No se pudo iniciar sesion')
        }
    }

    return (
        <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Inicio de sesion</Text>
        <View style={styles.form}>
            <View style={styles.fields}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                placeholder='Ingrese su username'
                placeholderTextColor='#000'
                style={styles.input} 
                onChangeText={setUsername}
                value={username}
                />
            </View>
            <View style={styles.fields}>
                <Text style={styles.label}>Contraseña</Text>
                <TextInput 
                    placeholder='Ingrese su contraseña'
                    placeholderTextColor='#000'
                    style={styles.input} 
                    onChangeText={setPassword}
                    value={password}
                    />
            </View>
            <Pressable onPress={handlePress} style={styles.containSubmit}>
                <Text style={[styles.submit, styles.bgBlue]}>Iniciar sesion</Text>
            </Pressable>
        </View>
        <View style={styles.container}>
            <Link href={'/register'} asChild><Pressable ><Text style={[styles.submit, styles.bgOutline]}>No tenes cuenta, registrate aca</Text></Pressable>
            </Link>
        </View>
    </SafeAreaView>
  )
}

const {width, height} = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    form: {
    },
    fields:{
        margin:10,
    },
    label:{
        margin: 4,
    },
    input: {
        borderWidth:1,
        padding: 10,
        height:40,
        width: width * 0.8,
        borderRadius: 10,

    },
    containSubmit: {
        alignItems: 'center',
    },
    submit: {
        textAlign: 'center',
        borderRadius: 10,
        padding: 10,
        height: 40,
        width: width * 0.8,
        fontSize:15,
        fontWeight: 'bold'
    },
    bgBlue: {
        backgroundColor: '#2E5077',
        color: '#fff'
    },
    bgOutline: {
        borderColor: '#2E5077',
        borderWidth: 2,
        color: '#2E5077',
    }

})
