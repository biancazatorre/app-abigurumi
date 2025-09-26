import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TouchableOpacity, ScrollView, ImageBackground,
    SafeAreaView, StatusBar, ActivityIndicator, Alert
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import styles from './style'; // Você vai copiar o style.js da página Coelho para cá
import Header from '../../components/Header';
import { getProdutoById } from '../../services/api'; // Função para buscar um produto
import imageMap from '../../components/MapaImages'; // Nosso mapa de imagens locais

export default function Detalhes({ route, navigation }) {
    const [menuVisible, setMenuVisible] = useState(false);
    const [produto, setProduto] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Pega o ID do produto que foi passado como parâmetro na navegação
    const { produtoId } = route.params;

    // 2. useEffect busca os dados do produto na API quando a tela abre
    useEffect(() => {
        const carregarDetalhesDoProduto = async () => {
            if (!produtoId) return;
            setLoading(true);
            try {
                const data = await getProdutoById(produtoId);
                setProduto(data);
            } catch (error) {
                Alert.alert("Erro", "Não foi possível carregar os detalhes do produto.");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        carregarDetalhesDoProduto();
    }, [produtoId]);

    // Mostra um indicador de carregamento enquanto busca os dados
    if (loading) {
        return <ActivityIndicator size="large" color="#E359EC" style={{ flex: 1, justifyContent: 'center' }} />;
    }

    // Mostra uma mensagem se o produto não for encontrado
    if (!produto) {
        return <View><Text>Produto não encontrado.</Text></View>;
    }

    // 3. O JSX abaixo é o da sua tela Coelho, mas usando os dados dinâmicos de `produto`
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

                <ScrollView contentContainerStyle={styles.container}>
                    <View style={styles.card}>
                        
                        {/* Imagem do Produto */}
                        <Image source={imageMap[produto.nome_imagem]} style={styles.produtoImagem} />
                        
                        <View style={styles.infoContainer}>
                            <View style={styles.textoContainer}>
                                <Text style={styles.nomeProduto}>{produto.nome}</Text>

                                <View style={styles.precoContainer}>
                                    <Text style={styles.precoPix}>
                                        R$ {Number(produto.preco).toFixed(2).replace('.', ',')} <Text style={styles.pix}>à vista </Text>
                                        <MaterialCommunityIcons name="cash" size={16} />
                                    </Text>
                                    <Text style={styles.precoParcelado}>
                                        ou 3x de R${(Number(produto.preco) / 3).toFixed(2).replace('.', ',')}{' '}
                                        <MaterialIcons name="payment" size={16} />
                                    </Text>
                                </View>

                                <Text style={styles.descricaoTitulo}>Descrição</Text>
                                <Text style={styles.descricaoTexto}>{produto.descricao}</Text>
                            </View>

                            <View style={styles.botoesContainer}>
                                <TouchableOpacity style={styles.botaoComprar}>
                                    <Text style={styles.textoComprar}>Comprar</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.botaoCarrinho}>
                                    <Text style={styles.textoCarrinho}>Adicionar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </SafeAreaView>
    );
}