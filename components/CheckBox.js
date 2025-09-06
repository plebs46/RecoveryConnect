import PropTypes from "prop-types"
import Icon from "react-native-vector-icons/FontAwesome"
import { Text, View, TouchableOpacity, StyleSheet } from "react-native" 

export default function CheckBox(props) {
  
  function handleChange() {
    const { onChange } = props;
    if (onChange) {
      return onChange();
    }
  }

  return (
    <View style={style.subsContainer}>
      <TouchableOpacity style={style.checkBox} onPress={handleChange}>
        {
          props.value ? <Icon name="check" /> : null
        }
      </TouchableOpacity>
      <Text style={style.textSubs}>
        {props.label}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  checkBox: {
    width: 23,
    height: 23,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  subsContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: "center",
  },
  textSubs: {
    fontSize: 14,
    marginLeft: 10,
  },
});

CheckBox.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value : PropTypes.bool,
}