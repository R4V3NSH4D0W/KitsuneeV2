import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  StyleProp,
  ViewStyle,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/color';

interface SearchProps {
  placeholder?: string;
  iconColor?: string;
  iconName?: string;
  onSearch: (query: string) => void;
  customStyles?: StyleProp<ViewStyle>;
  backgroundColor?: string;
  elevationEnabled?: boolean;
}

const Search: React.FC<SearchProps> = ({
  placeholder = 'Search...',
  iconColor = COLORS.whitePure,
  iconName = 'search',
  onSearch,
  customStyles,
  backgroundColor = COLORS.whitePure,
  elevationEnabled = true,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
        <View
          style={[
            styles.searchContainer,
            customStyles,
            {backgroundColor},

            elevationEnabled && styles.elevated,
          ]}>
          <SearchIcon
            name={iconName}
            size={20}
            color={iconColor}
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.input}
            placeholder={placeholder}
            placeholderTextColor={iconColor}
            onChangeText={handleSearch}
            value={searchQuery}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },
  elevated: {
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: COLORS.white,
  },
});
