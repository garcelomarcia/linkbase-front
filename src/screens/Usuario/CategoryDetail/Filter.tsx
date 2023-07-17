import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];
type Props = {
    data:
        {
            label:string;
            value:string;
        }[];
    
    placeholderName:string;
    search:boolean;
    handleSort:Function;
    handleFilter: Function;
  }

const DropdownComponent: React.FC<Props> = ({data,placeholderName,search,handleSort, handleFilter})=>{
  const [value, setValue] = useState("");
  const [isFocus, setIsFocus] = useState(false);
  

  return (<>
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        mode={"default"}
        data={data}
        search={search}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? `${placeholderName}` : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
          handleSort(item.value);
          handleFilter(item.value);
        }}
       
      />
      </>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5e5e5',
    padding: 16,
  },
  dropdown: {
    width:160,
    height: 31,
    backgroundColor: '#FFF',
    borderRadius: 20,
    fontFamily: "Outfit_500Medium",
    fontSize: 12,
    color:'#000000',
    shadowColor: "#000000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.1,
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