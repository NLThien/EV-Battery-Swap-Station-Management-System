import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SettingScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Cài đặt quản lý người dùng</Text>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Thêm người dùng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Danh sách người dùng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Phân quyền người dùng</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Đổi mật khẩu</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 32,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1976d2',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});