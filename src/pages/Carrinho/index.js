import React, { useState, useEffect, useCallback } from 'react';
import {
    View, Text, FlatList, TouchableOpacity, Image, ImageBackground,
    SafeAreaView, StatusBar, Alert, Linking
} from 'react-native';
import { SafeAreaView as SafeContextView } from 'react-native-safe-area-context';
import styles from './style';
import Header from '../../components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import { BASE_URL } from '../../services/api';

const ItemCarrinho = ({ item, onAumentar, onDiminuir, onRemover }) => {
    const subtotal = item.quantidade * item.preco;

    return (
      
        <View style={styles.cardContainer}>
            <Image source={{ uri: `${BASE_URL}${item.imagem_url}` }} style={styles.cardImage} />
            <View style={styles.cardInfo}>
                <Text style={styles.cardTitle} numberOfLines={2}>{item.nome}</Text>
                <Text style={styles.cardPrice}>R$ {Number(item.preco).toFixed(2).replace('.', ',')} (unid.)</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => onDiminuir(item.id)}>
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantidade}</Text>
                    <TouchableOpacity style={styles.quantityButton} onPress={() => onAumentar(item.id)}>
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <TouchableOpacity onPress={() => onRemover(item.id)}>
                    <Icon name="trash" size={24} color="#E359EC" />
                </TouchableOpacity>
                <Text style={styles.subtotalText}>R$ {subtotal.toFixed(2).replace('.', ',')}</Text>
            </View>
        </View>
        
    );
};

export default function Carrinho({ navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [carrinho, setCarrinho] = useState([]);

    const carregarCarrinho = useCallback(async () => {
        const json = await AsyncStorage.getItem('carrinho');
        setCarrinho(json ? JSON.parse(json) : []);
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', carregarCarrinho);
        return unsubscribe;
    }, [navigation, carregarCarrinho]);

    const aumentarQuantidade = async (produtoId) => {
        const novoCarrinho = carrinho.map(item =>
            item.id === produtoId ? { ...item, quantidade: item.quantidade + 1 } : item
        );
        setCarrinho(novoCarrinho);
        await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    };

    const diminuirQuantidade = async (produtoId) => {
        let novoCarrinho = [...carrinho];
        const itemIndex = novoCarrinho.findIndex(item => item.id === produtoId);

        if (itemIndex > -1) {
            if (novoCarrinho[itemIndex].quantidade > 1) {
                novoCarrinho[itemIndex].quantidade--;
            } else {
                novoCarrinho = novoCarrinho.filter(item => item.id !== produtoId);
            }
            setCarrinho(novoCarrinho);
            await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
        }
    };

    const removerItem = async (produtoId) => {
        const novoCarrinho = carrinho.filter(item => item.id !== produtoId);
        setCarrinho(novoCarrinho);
        await AsyncStorage.setItem('carrinho', JSON.stringify(novoCarrinho));
    };

    const finalizarCompra = async () => {
        if (carrinho.length === 0) {
            Alert.alert('Carrinho vazio', 'Adicione itens para finalizar a compra.');
            return;
        }
        const numeroWhatsapp = '5513997596685';
        const totalPedido = carrinho.reduce((soma, item) => soma + (item.quantidade * item.preco), 0);
        
        let mensagem = 'Olá! Gostaria de fazer o seguinte pedido:\n\n';
        carrinho.forEach(item => {
            mensagem += `*${item.quantidade}x* - ${item.nome}\n`;
        });
        mensagem += `\n*Total do Pedido:* R$ ${totalPedido.toFixed(2).replace('.', ',')}`;

        const mensagemCodificada = encodeURIComponent(mensagem);
        const url = `whatsapp://send?phone=${numeroWhatsapp}&text=${mensagemCodificada}`;

        try {
            await Linking.openURL(url);
        } catch (error) {
            Alert.alert("Erro", "Não foi possível abrir o WhatsApp. Verifique se está instalado.");
        }
    };

    const totalPedido = carrinho.reduce((soma, item) => soma + (item.quantidade * item.preco), 0);

    return (
       <ImageBackground
             source={require('../../../assets/images/fundo.png')}
             style={styles.background}
           >
            <SafeContextView style={styles.safeArea}>
        
                <Header
                    navigation={navigation}
                    menuVisible={menuVisible}
                    setMenuVisible={setMenuVisible}
                />
                <Text style={styles.title}>Meu Carrinho</Text>
                <FlatList
                    data={carrinho}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={({ item }) => (
                        <ItemCarrinho
                            item={item}
                            onAumentar={aumentarQuantidade}
                            onDiminuir={diminuirQuantidade}
                            onRemover={removerItem}
                        />
                    )}
                    ListEmptyComponent={<Text style={styles.emptyText}>Seu carrinho está vazio.</Text>}
                />
                {carrinho.length > 0 && (
                    <View style={styles.footerContainer}>
                        <Text style={styles.totalText}>Total: R$ {totalPedido.toFixed(2).replace('.', ',')}</Text>
                        <TouchableOpacity style={styles.finalizarButton} onPress={finalizarCompra}>
                            <Text style={styles.finalizarButtonText}>Finalizar Compra</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeContextView>
        </ImageBackground>
    );
}