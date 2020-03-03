import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native'


export default props => {
    return (
        <Modal onRequestClose={props.onCancel} visible={props.isVisible} animationType='slide' transparent={true} >
            <View style={styles.frame}>
                <View style={styles.container}>
                    <Text style={styles.title}>Selecione o Nivel</Text>
                    <TouchableOpacity onPress={() => props.onLevelSelected(0.1)} style={[styles.button, styles.bgEasy]}>
                        <Text style={styles.buttonLabel}>Facil</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onLevelSelected(0.2)} style={[styles.button, styles.bgMedium]}>
                        <Text style={styles.buttonLabel}>Médio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.onLevelSelected(0.3)} style={[styles.button, styles.bgHard]}>
                        <Text style={styles.buttonLabel}>Difícil</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    frame: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)'
    },
    container: {
        backgroundColor: '#EEE',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        marginTop: 10,
        padding: 5
    },
    buttonLabel: {
        fontSize: 20,
        color: '#EEE',
        fontWeight: 'bold'
    },
    bgEasy: {
        backgroundColor: '#49b65d'
    },
    bgMedium: {
        backgroundColor: '#2765f7'
    },
    bgHard: {
        backgroundColor: '#f26337'
    }
})