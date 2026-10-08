import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  StyleSheet,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAppDispatch } from "@/store/hooks";
import { registerUser } from "@/store/slices/authSlice";
import { AppButton } from "@/components/ui/shared/AppButton";
import Toast from "react-native-toast-message";
import type { MobileUser } from "@/types";

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();

  const nameRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreed, setAgreed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [focusedField, setFocusedField] = useState<
    "name" | "email" | "password" | "confirmPassword" | null
  >(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    agreed?: string;
  }>({});

  const handleRegister = () => {
    if (isLoading) return;

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();
    const nextErrors: typeof errors = {};

    if (!normalizedName) {
      nextErrors.name = "Please enter your name or alias.";
    }

    if (!normalizedEmail) {
      nextErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      nextErrors.password = "Please enter a password.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please repeat your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    if (!agreed) {
      nextErrors.agreed = "Please accept the compassionate service terms.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.password) passwordRef.current?.focus();
      else if (nextErrors.confirmPassword) confirmPasswordRef.current?.focus();
      else if (nextErrors.agreed) {
        Toast.show({
          type: "error",
          text1: "Agreement Required",
          text2: "Please check the agreement box to continue.",
        });
      }
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);

    setTimeout(() => {
      const newUser: MobileUser = {
        id: `user-${Date.now()}`,
        name: normalizedName,
        email: normalizedEmail,
        createdAt: new Date().toISOString(),
      };

      dispatch(registerUser(newUser));
      setIsLoading(false);

      Toast.show({
        type: "success",
        text1: `Account Created`,
        text2: `A 6-digit verification code has been sent to ${newUser.email}.`,
      });

      router.replace({
        pathname: "/verify-email",
        params: {
          email: newUser.email,
          redirect: redirect || "/history",
          mode: "register",
        },
      });
    }, 600);
  };

  return (
    <SafeAreaView edges={["top", "bottom"]} style={styles.screen}>
      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : Platform.OS === "android"
              ? "height"
              : undefined
        }
        style={styles.screen}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header Intro */}
            <View style={styles.intro}>
              <Text style={styles.brand}>Mental Health Anonymous</Text>
              <Text accessibilityRole="header" style={styles.heading}>
                Create your account
              </Text>
              <Text style={styles.description}>
                Keep all your anonymous support dispatches securely synchronized
                across your devices.
              </Text>
            </View>

            {/* Form Card */}
            <View style={styles.card}>
              {/* Field 1: Name or Alias */}
              <View style={styles.field}>
                <Text nativeID="name-label" style={styles.label}>
                  Your Name or Alias
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "name" && styles.inputFocused,
                    !!errors.name && styles.inputInvalid,
                  ]}
                >
                  <TextInput
                    ref={nameRef}
                    value={name}
                    onChangeText={(val) => {
                      setName(val);
                      setErrors((curr) => ({ ...curr, name: undefined }));
                    }}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter Your Name or Alias"
                    placeholderTextColor="#A1ABA6"
                    accessibilityLabel="Your Name or Alias"
                    accessibilityLabelledBy="name-label"
                    autoCapitalize="words"
                    autoCorrect={false}
                    autoComplete="name"
                    textContentType="name"
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={() => emailRef.current?.focus()}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                </View>
                {errors.name && <Text style={styles.error}>{errors.name}</Text>}
              </View>

              {/* Field 2: Email Address */}
              <View style={styles.field}>
                <Text nativeID="email-label" style={styles.label}>
                  Email Address
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "email" && styles.inputFocused,
                    !!errors.email && styles.inputInvalid,
                  ]}
                >
                  <TextInput
                    ref={emailRef}
                    value={email}
                    onChangeText={(val) => {
                      setEmail(val);
                      setErrors((curr) => ({ ...curr, email: undefined }));
                    }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="your.email@example.com"
                    placeholderTextColor="#A1ABA6"
                    accessibilityLabel="Email Address"
                    accessibilityLabelledBy="email-label"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    autoComplete="email"
                    textContentType="emailAddress"
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                </View>
                {errors.email && (
                  <Text style={styles.error}>{errors.email}</Text>
                )}
              </View>

              {/* Field 3: Password */}
              <View style={styles.field}>
                <Text nativeID="password-label" style={styles.label}>
                  Password
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "password" && styles.inputFocused,
                    !!errors.password && styles.inputInvalid,
                  ]}
                >
                  <TextInput
                    ref={passwordRef}
                    value={password}
                    onChangeText={(val) => {
                      setPassword(val);
                      setErrors((curr) => ({ ...curr, password: undefined }));
                    }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="At least 6 characters"
                    placeholderTextColor="#A1ABA6"
                    accessibilityLabel="Password"
                    accessibilityLabelledBy="password-label"
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    autoComplete="new-password"
                    textContentType="newPassword"
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={() => confirmPasswordRef.current?.focus()}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((curr) => !curr)}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? "Hide password" : "Show password"
                    }
                    disabled={isLoading}
                    activeOpacity={0.6}
                    style={styles.iconToggle}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={19}
                      color="#8E9C96"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
                )}
              </View>

              {/* Field 4: Confirm Password */}
              <View style={styles.field}>
                <Text nativeID="confirm-password-label" style={styles.label}>
                  Confirm Password
                </Text>
                <View
                  style={[
                    styles.inputContainer,
                    focusedField === "confirmPassword" && styles.inputFocused,
                    !!errors.confirmPassword && styles.inputInvalid,
                  ]}
                >
                  <TextInput
                    ref={confirmPasswordRef}
                    value={confirmPassword}
                    onChangeText={(val) => {
                      setConfirmPassword(val);
                      setErrors((curr) => ({
                        ...curr,
                        confirmPassword: undefined,
                      }));
                    }}
                    onFocus={() => setFocusedField("confirmPassword")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Repeat your password"
                    placeholderTextColor="#A1ABA6"
                    accessibilityLabel="Confirm Password"
                    accessibilityLabelledBy="confirm-password-label"
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    autoComplete="new-password"
                    textContentType="newPassword"
                    returnKeyType="go"
                    onSubmitEditing={handleRegister}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword((curr) => !curr)}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showConfirmPassword ? "Hide password" : "Show password"
                    }
                    disabled={isLoading}
                    activeOpacity={0.6}
                    style={styles.iconToggle}
                  >
                    <Ionicons
                      name={
                        showConfirmPassword ? "eye-off-outline" : "eye-outline"
                      }
                      size={19}
                      color="#8E9C96"
                    />
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && (
                  <Text style={styles.error}>{errors.confirmPassword}</Text>
                )}
              </View>

              {/* Consent Box */}
              <TouchableOpacity
                activeOpacity={0.85}
                accessibilityRole="checkbox"
                accessibilityState={{ checked: agreed, disabled: isLoading }}
                accessibilityLabel="I agree to use this service compassionately and understand that recipient identities are never tracked."
                disabled={isLoading}
                onPress={() => {
                  setAgreed(!agreed);
                  setErrors((curr) => ({ ...curr, agreed: undefined }));
                }}
                style={styles.agreementBox}
              >
                <View
                  style={[styles.checkbox, agreed && styles.checkboxActive]}
                >
                  {agreed && (
                    <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                  )}
                </View>
                <Text style={styles.agreementText}>
                  I agree to use this service compassionately and understand
                  that recipient identities are never tracked.
                </Text>
              </TouchableOpacity>

              {errors.agreed && (
                <Text accessibilityLiveRegion="polite" style={styles.error}>
                  {errors.agreed}
                </Text>
              )}

              {/* Submit Button */}
              <AppButton
                onPress={handleRegister}
                loading={isLoading}
                style={styles.submitButton}
              >
                Create Account
              </AppButton>
            </View>

            {/* Footer Sign In Option */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <TouchableOpacity
                accessibilityRole="link"
                onPress={() =>
                  router.push({
                    pathname: "/login",
                    params: redirect ? { redirect } : undefined,
                  })
                }
                style={styles.signInLink}
              >
                <Text style={styles.signInText}>Sign In Instead</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F5F6F2",
  },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  content: {
    width: "100%",
    maxWidth: 440,
  },
  intro: {
    marginBottom: 24,
  },
  brand: {
    fontSize: 14,
    lineHeight: 20,
    color: "#658C7E",
    fontWeight: "500",
    marginBottom: 8,
  },
  heading: {
    fontSize: 32,
    lineHeight: 38,
    color: "#18231F",
    fontFamily: Platform.select({
      ios: "Georgia",
      android: "serif",
      web: "Georgia, serif",
    }),
    fontWeight: "400",
    letterSpacing: -0.4,
    marginBottom: 8,
  },
  description: {
    fontSize: 13.5,
    lineHeight: 20,
    color: "#6B7A75",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 12,
    gap: 16,
    borderWidth: 1,
    borderColor: "#ECEFE8",
    ...Platform.select({
      ios: {
        shadowColor: "#18231F",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 14,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 4px 20px rgba(24, 35, 31, 0.04)",
      },
    }),
  },
  field: {
    gap: 6,
  },
  label: {
    fontSize: 15,
    lineHeight: 22,
    fontWeight: "400",
    color: "#18231F",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 52,
    borderWidth: 1,
    borderColor: "#DDE2DA",
    borderRadius: 12,
    backgroundColor: "#FAFAF7",
  },
  inputFocused: {
    borderColor: "#285346",
    backgroundColor: "#FFFFFF",
  },
  inputInvalid: {
    borderColor: "#A9524A",
  },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 50,
    paddingHorizontal: 12,
    paddingVertical: 13,
    fontSize: 16,
    color: "#18231F",
    backgroundColor: "transparent",
    borderWidth: 0,
    ...Platform.select({
      web: {
        outlineWidth: 0,
      },
    }),
  },
  iconToggle: {
    minWidth: 44,
    minHeight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 12,
    lineHeight: 16,
    color: "#A9524A",
    marginTop: 2,
  },
  agreementBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#EBF3EE",
    borderWidth: 1,
    borderColor: "#D4E4DB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    gap: 10,
    marginTop: 2,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "#9DB3A8",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1.5,
  },
  checkboxActive: {
    backgroundColor: "#285346",
    borderColor: "#285346",
  },
  agreementText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: "#4B6358",
  },
  submitButton: {
    borderRadius: 12,
    backgroundColor: "#2E5E52",
    minHeight: 50,
    marginTop: 4,
  },
  footer: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    fontSize: 13.5,
    color: "#6B7A75",
  },
  signInLink: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  signInText: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#18231F",
  },
});
