import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, Image, Platform, ImageBackground, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import styles from './style';
import { createProduto, updateProduto } from '../../services/api';
import { api, BASE_URL } from '../../services/api';
import Header from '../../components/Header';
import InputField from '../../components/Input/index';

export default function ProductForm({ route, navigation }) {
    const { produto } = route.params;
    const isEditing = !!produto;

    const [nome, setNome] = useState(isEditing ? produto.nome : '');
    const [descricao, setDescricao] = useState(isEditing ? produto.descricao : '');
    const [preco, setPreco] = useState(isEditing ? String(produto.preco) : '');
    const [imagemUrl, setImagemUrl] = useState(isEditing ? produto.imagem_url : '');
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const storedToken = await AsyncStorage.getItem('userToken');
            setToken(storedToken);
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert('Permissão necessária', 'Precisamos de permissão para acessar sua galeria.');
                }
            }
        })();
    }, []);

   const handleAnexarImagem = async () => {
    console.log('--- Iniciando handleAnexarImagem ---');

    // Etapa de Permissão
    try {
        const permissionResponse = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResponse.granted === false) {
            Alert.alert('Permissão Negada', 'Para anexar uma imagem, você precisa permitir o acesso à galeria.');
            console.log('Permissão foi negada pelo usuário.');
            return;
        }
        console.log('Permissão concedida, prosseguindo...');
    } catch (err) {
        console.error('Erro ao PEDIR permissão:', err);
        Alert.alert('Erro', 'Houve um problema ao solicitar permissão para a galeria.');
        return;
    }

    // Etapa de Abrir a Galeria
    try {
        console.log('Tentando abrir a galeria de imagens...');
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: 'Images',
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // Imprime o resultado, seja ele qual for
        console.log('Resultado do ImagePicker:', JSON.stringify(result, null, 2));

        if (!result.canceled) {
            console.log('Imagem selecionada. Iniciando upload...');
            const uri = result.assets[0].uri;
            const formData = new FormData();
            formData.append('image', {
                uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
                name: `photo_${Date.now()}.jpg`,
                type: 'image/jpeg',
            });
            
            setLoading(true);
            const response = await api.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            setImagemUrl(response.data.imageUrl);
            setLoading(false);

        } else {
            console.log('Usuário cancelou a seleção de imagem.');
        }
    } catch (err) {
        console.error('!!! ERRO CRÍTICO ao tentar abrir a galeria ou fazer upload:', err);
        Alert.alert('Erro Inesperado', 'Não foi possível abrir a galeria ou processar a imagem.');
        setLoading(false);
    }
};

    const handleSalvar = async () => {
        if (!nome || !preco || !imagemUrl) {
            Alert.alert('Erro', 'Nome, preço e imagem são obrigatórios.');
            return;
        }
        setLoading(true);
        const produtoData = { nome, descricao, preco, imagem_url: imagemUrl };

        try {
            if (isEditing) {
                await updateProduto(produto.id, produtoData, token);
            } else {
                await createProduto(produtoData, token);
            }
            Alert.alert('Sucesso', `Produto ${isEditing ? 'atualizado' : 'criado'} com sucesso!`);
            navigation.goBack();
        } catch (error) {
            Alert.alert('Erro', 'Falha ao salvar o produto.');
        } finally {
            setLoading(false);
        }
    };

    return (
        
        <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
            <ImageBackground
                source={require('../../../assets/images/fundo.png')}
                style={styles.background}
            >
                <Header
                    navigation={navigation}
                    menuVisible={menuVisible}
                    setMenuVisible={setMenuVisible}
                />
                  <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ flex: 1 }}
                >
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>{isEditing ? 'Editar Produto' : 'Novo Produto'}</Text>
                    
                    <TouchableOpacity onPress={handleAnexarImagem} style={styles.imagePickerContainer}>
                        {imagemUrl ? (
                          <Image source={{ uri: `${BASE_URL}${imagemUrl}` }} style={styles.previewImage} />
                        ) : (
                          <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePickerButtonText}>Anexar Imagem</Text>
                          </View>
                        )}
                    </TouchableOpacity>

                    <InputField label="Nome do Produto:" value={nome} onChangeText={setNome} />
                    <InputField label="Descrição:" value={descricao} onChangeText={setDescricao} />
                    <InputField label="Preço (Ex: 49.90):" value={preco} onChangeText={setPreco} keyboardType="numeric" />
                    
                    <TouchableOpacity style={styles.saveButton} onPress={handleSalvar} disabled={loading}>
                        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.saveButtonText}>{isEditing ? 'Atualizar Produto' : 'Cadastrar Produto'}</Text>}
                    </TouchableOpacity>
                </ScrollView>
                </KeyboardAvoidingView>

            </ImageBackground>
        </SafeAreaView>
    );
}