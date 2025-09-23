// screens/ProdutoDetalhe/index.js
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, ScrollView, Image} from 'react-native';
import { getProdutoById } from '../../services/api';
import styles from './style'; // Crie um style.js para esta tela

// A tela recebe a prop 'route', que contém os parâmetros passados
export default function ProdutoDetalheScreen({ route, navigation }) {
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  // Pega o ID do produto que foi passado como parâmetro na navegação
  const { produtoId } = route.params;

  useEffect(() => {
    const carregarDetalhes = async () => {
      try {
        setLoading(true);
        const data = await getProdutoById(produtoId);
        setProduto(data);
      } catch (error) {
        console.error(error);
        // Lidar com erro, talvez mostrar uma mensagem
      } finally {
        setLoading(false);
      }
    };

    carregarDetalhes();
  }, [produtoId]);

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!produto) {
    return <View><Text>Produto não encontrado.</Text></View>;
  }

  // 👇 AQUI VOCÊ VAI RENDERIZAR O VISUAL DA SUA TELA 'COELHO.JS' 👇
  // Use os dados do estado 'produto' (ex: produto.nome, produto.preco, etc.)
  return (
    <SafeAreaView>
      <ScrollView>
        <Image source={{ uri: produto.imagem_url }} style={styles.produtoImagem} />
        <Text style={styles.nomeProduto}>{produto.nome}</Text>
        <Text style={styles.preco}>R$ {produto.preco}</Text>
        <Text style={styles.descricaoTexto}>{produto.descricao}</Text>
        {/* Cole o resto do seu JSX da tela Coelho aqui, adaptando para usar os dados de 'produto' */}
      </ScrollView>
    </SafeAreaView>
  );
}