import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme/colors";

/**
 * FormInput Component
 * Reusable text input component with label and validation
 * BAB 7: Handling Text Input
 */
const FormInput = ({
  label,
  placeholder,
  value,
  onChangeText,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  maxLength = 100,
  editable = true,
  errorMessage = "",
}) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          errorMessage && styles.inputError,
          !editable && styles.inputDisabled,
        ]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textLight}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        maxLength={maxLength}
        editable={editable}
      />
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.textDark,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },
  multilineInput: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: COLORS.accent,
  },
  inputDisabled: {
    backgroundColor: COLORS.background,
    color: COLORS.textLight,
  },
  errorText: {
    color: COLORS.accent,
    fontSize: 12,
    marginTop: 5,
    fontWeight: "500",
  },
});

export default FormInput;
