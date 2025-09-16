
import React from 'react';
import { ScrollView, Image } from 'react-native';
import styles from './style';

export default function ImageGallery({ images, imageStyle, containerStyle }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[styles.galeria, containerStyle]}
      contentContainerStyle={styles.galeriaContent}
    >
      {images.map((img, index) => (
        <Image
          key={index}
          source={img}
          style={[styles.produtoImagem, imageStyle]}
        />
      ))}
    </ScrollView>
  );
}
