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
import { loginUser } from "@/store/slices/authSlice";
import { AppButton } from "@/components/ui/shared/AppButton";
import Toast from "react-native-toast-message";
import type { MobileUser } from "@/types";

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { redirect } = useLocalSearchParams<{ redirect?: string }>();
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(
    null,
  );
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );

  const handleLogin = () => {
    if (isLoading) return;
    const normalizedEmail = email.trim().toLowerCase();
    const nextErrors = {
      email: !normalizedEmail
        ? "Please enter your email address."
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
          ? "Please enter a valid email address."
          : undefined,
      password: !password.trim() ? "Please enter your password." : undefined,
    };
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      (nextErrors.email ? emailRef : passwordRef).current?.focus();
      return;
    }
    Keyboard.dismiss();
    setIsLoading(true);
    setTimeout(() => {
      // Preserve the existing local session flow.
      const user: MobileUser = {
        id: normalizedEmail.includes("sarah")
          ? "user-demo-1"
          : `user-${Date.now()}`,
        name: normalizedEmail
          .split("@")[0]
          .replace(".", " ")
          .replace(/^\w/, (c) => c.toUpperCase()),
        email: normalizedEmail,
        createdAt: new Date().toISOString(),
      };
      dispatch(loginUser(user));
      setIsLoading(false);
      Toast.show({
        type: "success",
        text1: `Welcome back, ${user.name}!`,
        text2: "Signed in successfully.",
      });
      router.replace(redirect ? (redirect as any) : "/history");
    }, 600);
  };

  return (
    <SafeAreaView style={styles.screen}>
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
            <View style={styles.intro}>
              <Text style={styles.brand}>Mental Health Anonymous</Text>
              <Text accessibilityRole="header" style={styles.heading}>
                Welcome back
              </Text>
              <Text style={styles.description}>
                Sign in to manage your private dispatches, view synchronized
                delivery logs, and send confidential toolkits.
              </Text>
            </View>
            <View style={styles.form}>
              <View style={styles.field}>
                <Text nativeID="login-email-label" style={styles.label}>
                  Email
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
                    onChangeText={(value) => {
                      setEmail(value);
                      setErrors((current) => ({
                        ...current,
                        email: undefined,
                      }));
                    }}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your email"
                    placeholderTextColor="#87948E"
                    accessibilityLabel="Email address"
                    accessibilityLabelledBy="login-email-label"
                    accessibilityHint={errors.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    autoComplete="email"
                    textContentType="username"
                    returnKeyType="next"
                    submitBehavior="submit"
                    onSubmitEditing={() => passwordRef.current?.focus()}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                </View>
                {errors.email && (
                  <Text accessibilityLiveRegion="polite" style={styles.error}>
                    {errors.email}
                  </Text>
                )}
              </View>
              <View style={styles.field}>
                <Text nativeID="login-password-label" style={styles.label}>
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
                    onChangeText={(value) => {
                      setPassword(value);
                      setErrors((current) => ({
                        ...current,
                        password: undefined,
                      }));
                    }}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter your password"
                    placeholderTextColor="#87948E"
                    accessibilityLabel="Password"
                    accessibilityLabelledBy="login-password-label"
                    accessibilityHint={errors.password}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoCorrect={false}
                    spellCheck={false}
                    autoComplete="current-password"
                    textContentType="password"
                    returnKeyType="go"
                    onSubmitEditing={handleLogin}
                    editable={!isLoading}
                    selectionColor="#2E5E52"
                    style={styles.input}
                  />
                  <TouchableOpacity
                    onPress={() => setShowPassword((current) => !current)}
                    accessibilityRole="button"
                    accessibilityLabel={
                      showPassword ? "Hide password" : "Show password"
                    }
                    accessibilityState={{
                      checked: showPassword,
                      disabled: isLoading,
                    }}
                    disabled={isLoading}
                    activeOpacity={0.6}
                    style={styles.passwordToggle}
                  >
                    <Ionicons
                      name={showPassword ? "eye-off-outline" : "eye-outline"}
                      size={20}
                      color="#6B7A75"
                    />
                  </TouchableOpacity>
                </View>
                {errors.password && (
                  <Text accessibilityLiveRegion="polite" style={styles.error}>
                    {errors.password}
                  </Text>
                )}
              </View>
              <AppButton
                onPress={handleLogin}
                loading={isLoading}
                style={styles.submit}
              >
                Sign In to Account
              </AppButton>
              <TouchableOpacity
                accessibilityRole="link"
                accessibilityLabel="Forgot password? Get account help"
                onPress={() => router.push("/help")}
                style={styles.forgotPassword}
              >
                <Text style={styles.linkText}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.footerText}>Don’t have an account?</Text>
            <TouchableOpacity
              accessibilityRole="link"
              onPress={() =>
                router.push({
                  pathname: "/register",
                  params: redirect ? { redirect } : undefined,
                })
              }
              style={styles.registerLink}
            >
              <Text style={styles.registerText}>Register Now</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: "#F5F6F2" },
  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  content: { width: "100%", maxWidth: 440 },
  intro: { marginBottom: 30 },
  brand: { fontSize: 14, lineHeight: 21, color: "#6F8F84", marginBottom: 10 },
  heading: {
    fontSize: 34,
    lineHeight: 42,
    color: "#18231F",
    fontFamily: Platform.select({
      ios: "Georgia",
      android: "serif",
      web: "Georgia, serif",
    }),
    fontWeight: "400",
    marginBottom: 8,
  },
  description: { fontSize: 14, lineHeight: 22, color: "#6B7A75" },
  form: { gap: 20 },
  field: { gap: 8 },
  label: { fontSize: 15, lineHeight: 22, fontWeight: "500", color: "#18231F" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 54,
    borderWidth: 1,
    borderColor: "#DDE2DA",
    borderRadius: 12,
    backgroundColor: "#FAFAF7",
  },
  inputFocused: { borderColor: "#2E5E52", backgroundColor: "#FFFFFF" },
  inputInvalid: { borderColor: "#A9524A" },
  input: {
    flex: 1,
    minWidth: 0,
    minHeight: 52,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 16,
    color: "#18231F",
    ...Platform.select({ web: { outlineWidth: 0 } }),
  },
  passwordToggle: {
    minWidth: 48,
    minHeight: 52,
    alignItems: "center",
    justifyContent: "center",
  },
  error: { fontSize: 13, lineHeight: 19, color: "#A9524A" },
  submit: { borderRadius: 12, backgroundColor: "#2E5E52", marginTop: 4 },
  forgotPassword: {
    alignSelf: "flex-end",
    minHeight: 44,
    justifyContent: "center",
    marginTop: -16,
    paddingHorizontal: 2,
  },
  linkText: { fontSize: 13, lineHeight: 20, color: "#35443D" },
  footer: {
    width: "100%",
    maxWidth: 440,
    marginTop: "auto",
    paddingTop: 64,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    columnGap: 5,
  },
  footerText: { fontSize: 13, lineHeight: 20, color: "#536159" },
  registerLink: {
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  registerText: {
    fontSize: 13,
    lineHeight: 20,
    fontWeight: "600",
    color: "#2E5E52",
  },
});
