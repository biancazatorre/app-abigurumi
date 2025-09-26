import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Alert, FlatList, ActivityIndicator, Image, ImageBackground, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style';
import { getProdutos, deleteProduto } from '../../services/api';
import { BASE_URL } from '../../services/api';
import Header from '../../components/Header';

const ProdutoListItem = ({ item, onEditar, onRemover }) => (
    <View style={styles.card}>
        <Image 
          source={{ uri: `${BASE_URL}${item.imagem_url}` }} 
          style={styles.produtoImagem} 
        />
        <View style={styles.infoContainer}>
            <Text style={styles.nomeProduto}>{item.nome}</Text>
            <Text style={styles.precoPix}>R$ {Number(item.preco).toFixed(2).replace('.', ',')}</Text>
            <View style={styles.botoesContainer}>
                <TouchableOpacity style={styles.botaoEditar} onPress={() => onEditar(item)}>
                    <MaterialCommunityIcons name="pencil" size={20} color="#FFF" />
                    <Text style={styles.textoBotao}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoExcluir} onPress={() => onRemover(item.id)}>
                    <MaterialCommunityIcons name="trash-can" size={20} color="#FFF" />
                    <Text style={styles.textoBotao}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
);

export default function ProductList({ navigation }) {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState(null);
    const [menuVisible, setMenuVisible] = useState(false);

    const fetchTokenAndLoad = useCallback(async () => {
        const storedToken = await AsyncStorage.getItem('userToken');
        if (storedToken) {
            setToken(storedToken);
            await carregarProdutos(storedToken);
        } else {
            Alert.alert("Erro", "Você precisa estar logado.");
            navigation.navigate('Login');
        }
    }, [navigation]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', fetchTokenAndLoad);
        return unsubscribe;
    }, [navigation, fetchTokenAndLoad]);

    const carregarProdutos = async (authToken) => {
        setLoading(true);
        try {
            const data = await getProdutos(authToken);
            setProdutos(data);
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível carregar os produtos.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemover = (id) => {
        Alert.alert("Confirmar Exclusão", "Tem certeza que deseja remover este produto?", [
            { text: "Cancelar", style: 'cancel' },
            { text: "Sim, Remover", onPress: async () => {
                try {
                    await deleteProduto(id, token);
                    Alert.alert('Sucesso', 'Produto removido!');
                    await carregarProdutos(token);
                } catch (error) {
                    Alert.alert('Erro', 'Não foi possível remover o produto.');
                }
            }}
        ]);
    };

    const handleEditar = (produto) => {
        navigation.navigate('ProductForm', { produto: produto });
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
                <FlatList
                    data={produtos}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ProdutoListItem item={item} onEditar={handleEditar} onRemover={handleRemover} />
                    )}
                    contentContainerStyle={styles.container}
                    onRefresh={() => carregarProdutos(token)}
                    refreshing={loading}
                    ListHeaderComponent={<Text style={styles.title}>Gerenciar Produtos</Text>}
                />
            </ImageBackground>
        </SafeAreaView>
    );
}