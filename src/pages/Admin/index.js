import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, Text, TouchableOpacity, SafeAreaView, StatusBar, 
  Alert, FlatList, ActivityIndicator, ImageBackground, Image } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style'; // Seus estilos
import Header from '../../components/Header';
import InputField from '../../components/Input/index';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '../../services/api';



const ProdutoForm = ({ produto, onSalvar, loading }) => {
 
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [imagemUrl, setImagemUrl] = useState('');

  useEffect(() => {
    setNome(produto ? produto.nome : '');
    setPreco(produto ? String(produto.preco) : '');
    setDescricao(produto ? produto.descricao : '');
    setImagemUrl(produto ? produto.imagem_url : '');
  }, [produto]);

  const handleSalvar = () => {
    onSalvar({ nome, preco, descricao, imagem_url: imagemUrl });
  };

  return (
    <View style={styles.cardLogin}>
      <Text style={styles.cardTitle}>{produto ? 'Editar Produto' : 'Novo Produto'}</Text>
      <InputField label="Nome:" value={nome} onChangeText={setNome} />
      <InputField label="Descrição:" value={descricao} onChangeText={setDescricao} />
      <InputField label="Preço:" value={preco} onChangeText={setPreco} keyboardType="numeric" />
      <InputField label="URL da Imagem:" value={imagemUrl} onChangeText={setImagemUrl} />
      <TouchableOpacity style={styles.botaoEntrar} onPress={handleSalvar} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.botaoEntrarTexto}>{produto ? 'Atualizar' : 'Cadastrar'}</Text>}
      </TouchableOpacity>
    </View>
  );
};


// 2. Componente de item da lista foi TOTALMENTE refeito para se parecer com seu `Coelho.js`
const ProdutoListItem = ({ item, onEditar, onRemover }) => {
  const precoFormatado = Number(item.preco).toFixed(2).replace('.', ',');
  const precoParcelado = (Number(item.preco) / 3).toFixed(2).replace('.', ',');

  return (
    <View style={styles.card}>
      {/* Imagem do Produto - você pode transformar isso em uma galeria depois */}
      {item.imagem_url ? (
        <Image source={{ uri: item.imagem_url }} style={styles.produtoImagem} />
      ) : (
        <View style={styles.imagemPlaceholder}><Text>Sem Imagem</Text></View>
      )}

      <View style={styles.infoContainer}>
        <View style={styles.textoContainer}>
          <Text style={styles.nomeProduto}>{item.nome}</Text>

          <View style={styles.precoContainer}>
            <Text style={styles.precoPix}>
              R$ {precoFormatado} <Text style={styles.pix}>à vista </Text>
              <MaterialCommunityIcons name="cash" size={16} />
            </Text>
            <Text style={styles.precoParcelado}>
              ou 3x de R${precoParcelado}{' '}
              <MaterialIcons name="payment" size={16} />
            </Text>
          </View>
          
          <Text style={styles.descricaoTitulo}>Descrição</Text>
          <Text style={styles.descricaoTexto}>{item.descricao || 'Sem descrição'}</Text>
        </View>

        {/* Botões específicos do Admin */}
        <View style={styles.botoesContainer}>
          <TouchableOpacity style={styles.botaoComprar} onPress={() => onEditar(item)}>
            <Text style={styles.textoComprar}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoCarrinho} onPress={() => onRemover(item.id)}>
            <Text style={styles.textoCarrinho}>Excluir</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};


// --- COMPONENTE PRINCIPAL DA TELA ---

export default function AdminScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const fetchTokenAndLoad = useCallback(async () => {
    const storedToken = await AsyncStorage.getItem('userToken');
    if (storedToken) {
      setToken(storedToken);
      carregarProdutos(storedToken);
    } else {
      Alert.alert("Erro de Autenticação", "Você precisa estar logado como admin.");
    }
  }, []);

  useEffect(() => {
    // Carrega tudo quando a tela é focada
    const unsubscribe = navigation.addListener('focus', () => {
      fetchTokenAndLoad();
    });
    return unsubscribe;
  }, [navigation, fetchTokenAndLoad]);

  const carregarProdutos = async (authToken) => {
    if (!authToken) return;
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
  
  const handleSalvarProduto = async (produtoData) => {
    // ... (lógica de salvar continua a mesma)
    if (!produtoData.nome || !produtoData.preco) {
      Alert.alert('Erro', 'Preencha nome e preço.');
      return;
    }
    setLoading(true);
    try {
      if (produtoSelecionado) {
        await updateProduto(produtoSelecionado.id, produtoData, token);
        Alert.alert('Sucesso', 'Produto atualizado!');
      } else {
        await createProduto(produtoData, token);
        Alert.alert('Sucesso', 'Produto criado!');
      }
      setProdutoSelecionado(null);
      await carregarProdutos(token);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoverProduto = async (id) => {
    // ... (lógica de remover continua a mesma)
    Alert.alert("Confirmar", "Tem certeza que deseja remover este produto?",
      [{ text: "Cancelar" }, { text: "Sim", onPress: async () => {
        setLoading(true);
        try {
          await deleteProduto(id, token);
          Alert.alert('Sucesso', 'Produto removido!');
          await carregarProdutos(token);
        } catch (error) {
          Alert.alert('Erro', 'Não foi possível remover o produto.');
        } finally { setLoading(false); }
      }}]
    );
  };
  
  // O Header da FlatList será nosso formulário
  const renderHeader = () => (
    <>
      <View style={styles.logoContainer}>
        <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
      </View>
      <ProdutoForm 
        produto={produtoSelecionado} 
        onSalvar={handleSalvarProduto} 
        loading={loading}
      />
      <Text style={styles.sectionTitle}>Produtos Cadastrados</Text>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
        {/* 3. ImageBackground e Header foram mantidos como você pediu */}
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
            <ProdutoListItem 
              item={item} 
              onEditar={setProdutoSelecionado} 
              onRemover={handleRemoverProduto}
            />
          )}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.container}
          onRefresh={() => carregarProdutos(token)}
          refreshing={loading}
        />
      </ImageBackground>
    </SafeAreaView>
  );
}