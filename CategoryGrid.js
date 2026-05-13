import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colors } from './colors';
import { spacing, borderRadius, fontSize, fontWeight } from './spacing';

const CategoryGrid = ({ categories, selectedId, onSelect }) => {
  const styles = StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.md,
      marginBottom: spacing.lg,
    },
    item: {
      width: '31%',
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.sm,
      borderRadius: borderRadius.md,
      backgroundColor: colors.white,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.grayBorder,
    },
    itemSelected: {
      borderColor: colors.primary,
      backgroundColor: colors.bgLightBlue,
    },
    icon: {
      fontSize: 35,
      marginBottom: spacing.sm,
    },
    name: {
      fontSize: fontSize.small,
      fontWeight: fontWeight.medium,
      color: colors.gray,
      textAlign: 'center',
    },
  });

  return (
    <View style={styles.grid}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.item,
            selectedId === category.id && styles.itemSelected,
          ]}
          onPress={() => onSelect(category)}
          activeOpacity={0.7}
        >
          <Text style={styles.icon}>{category.icon}</Text>
          <Text style={styles.name}>{category.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CategoryGrid;
