import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {COLORS} from '../constants/color';
import {useNavigation, useRoute} from '@react-navigation/native';
import CustomText from '../@ui/text';

const NavBar = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity onPress={openDrawer}>
        <Icon name="menu" size={26} color={COLORS.whitePure} />
      </TouchableOpacity>
      <CustomText
        title={route.name}
        fontType="bold"
        fontSize={16}
        textColor={COLORS.whitePure}
      />

      <Icon name="bell-outline" size={24} color={COLORS.whitePure} />
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  wrapper: {
    margin: 10,
    paddingTop: 10,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
});
