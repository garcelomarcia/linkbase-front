import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { DropdownOptions, Form } from '../screens/Register/Register';

type Props = {
  data: DropdownOptions[];
  placeholderName: string;
  onSelect: (key: keyof Form, value: string) => void;
  formInput: keyof Form;
}

const DropdownComponent: React.FC<Props> = ({ data, placeholderName, formInput, onSelect }) => {

  const [value, setValue] = useState<number>(0);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  return (
    <Dropdown
      style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      itemTextStyle={styles.itemTextStyle}
      mode={"modal"}
      data={data}
      search
      maxHeight={200}
      labelField="name"
      valueField="id"
      placeholder={!isFocus ? `${placeholderName}` : '...'}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={item => {
        setValue(item.id);
        setIsFocus(false);
        onSelect(formInput, item.name)
      }}
    />
  );
}

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 16,
  },
  dropdown: {
    width:322,
    height: 59,
    backgroundColor: '#F3F3F3',
    borderRadius: 15,
    fontFamily: "Outfit_500Medium",
    fontSize: 15,
    color:'#fff',
    shadowColor: "#0000001F",
    shadowOffset: { width: -1, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 1,
    marginBottom:12,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: '#e5e5e5',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontFamily: "Outfit_500Medium",
    fontSize: 15,
    color:'#666161',
  },
  placeholderStyle: {
    fontFamily: "Outfit_500Medium",
    fontSize: 15,
    marginLeft:20,
    color:'#666161',
  },
  selectedTextStyle: {
    fontFamily: "Outfit_500Medium",
    fontSize: 15,
    marginLeft:20,
    color:'#666161',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontFamily: "Outfit_500Medium",
    fontSize: 15,
    color:'#666161',
  },
  itemTextStyle: {
    fontFamily: "Outfit_500Medium",
    fontSize: 15,
    color:'#666161',
  }
});