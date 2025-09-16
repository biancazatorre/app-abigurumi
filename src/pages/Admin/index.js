import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ImageBackground, Image, SafeAreaView, StatusBar, Alert, FlatList } from 'react-native';
import styles from './style';
import Header from '../../components/Header';
import InputField from '../../components/Input/index';
import { getProdutos, createProduto, updateProduto, deleteProduto } from '../../services/api';

export default function Admin({ navigation }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [idEdicao, setIdEdicao] = useState(null);

  // Carregar produtos na montagem
  useEffect(() => {
    carregarProdutos();
  }, []);

  const carregarProdutos = async () => {
    try {
      const data = await getProdutos();
      setProdutos(data);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    }
  };

  const salvarProduto = async () => {
    if (!nome || !preco) {
      Alert.alert('Erro', 'Preencha nome e preço.');
      return;
    }

    try {
      if (idEdicao) {
        await updateProduto(idEdicao, { nome, preco });
        Alert.alert('Sucesso', 'Produto atualizado!');
      } else {
        await createProduto({ nome, preco });
        Alert.alert('Sucesso', 'Produto criado!');
      }
      setNome('');
      setPreco('');
      setIdEdicao(null);
      carregarProdutos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o produto.');
    }
  };

  const editarProduto = (produto) => {
    setNome(produto.nome);
    setPreco(produto.preco);
    setIdEdicao(produto.id);
  };

  const removerProduto = async (id) => {
    try {
      await deleteProduto(id);
      Alert.alert('Sucesso', 'Produto removido!');
      carregarProdutos();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível remover o produto.');
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

        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.logoContainer}>
            <Image source={require('../../../assets/images/logo.png')} style={styles.logo} />
          </View>

          <View style={styles.cardLogin}>
            <Text style={styles.cardTitle}>
              {idEdicao ? 'Editar Produto' : 'Novo Produto'}
            </Text>

            <InputField
              label="Nome:"
              placeholder="Nome do produto"
              value={nome}
              onChangeText={setNome}
              required
            />

            <InputField
              label="Preço:"
              placeholder="Ex: R$ 50,00"
              value={preco}
              onChangeText={setPreco}
              keyboardType="numeric"
              required
            />

            <TouchableOpacity style={styles.botaoEntrar} onPress={salvarProduto}>
              <Text style={styles.botaoEntrarTexto}>
                {idEdicao ? 'Atualizar' : 'Cadastrar'}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Produtos Cadastrados</Text>

          <FlatList
            data={produtos}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cardContainer}>
                <Text style={styles.cardTitle}>{item.nome}</Text>
                <Text style={styles.cardPrice}>{item.preco}</Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={styles.verButton}
                    onPress={() => editarProduto(item)}
                  >
                    <Text style={styles.buttonText}>Editar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.comprarButton}
                    onPress={() => removerProduto(item.id)}
                  >
                    <Text style={styles.buttonText}>Excluir</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}
