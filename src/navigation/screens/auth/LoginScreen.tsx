import EyeToggleIcon from "@/components/EyeToggleIcon";
import { ThemedButton } from "@/components/ui/ThemedButton";
import ThemedInputWithLabel from "@/components/ui/ThemedInputWithLabel";
import { ThemedKeyboardAvoidingView } from "@/components/ui/ThemedKeyboardAvoidingView";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { useSnackbar } from "@/context/SnackbarContext";
import { useLogin } from "@/services/query-service/auth";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";

export default function LoginScreen() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const emailOrPhoneNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation<any>();
  const snackbar = useSnackbar()
  const { mutate, isPending } = useLogin({
    onSuccess: (data) => {
      snackbar.showSnackbar(`Welcome ${data.data.user.fullName}`,"success")
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "HomeTabs",
          },
        ],
      });
    },
  });
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "all",
    defaultValues: {
      emailOrPhoneNumber: "",
      password: "",
    },
  });

  useEffect(() => {
    emailOrPhoneNumberRef?.current?.focus();
  }, []);

  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <ThemedSafeAreaView>
      <ThemedKeyboardAvoidingView contentContainerStyle={{ padding: 20 }}>
        <ThemedText type="largeThinTitle" style={{ marginTop: 80 }}>
          Welcome To
        </ThemedText>
        <ThemedText type="largeThinTitle" color="primary">
          Event Booker
        </ThemedText>

        <ThemedText color="textMuted" style={{ marginTop: 10 }}>
          Proceed with you email or phone number
        </ThemedText>

        <Controller
          control={control}
          rules={{
            required: "Required",
            validate: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

              const phoneRegex = /^[0-9]{10}$/;

              if (emailRegex.test(value) || phoneRegex.test(value)) {
                return true;
              }
              return "Enter a valid 10-digit phone number or email";
            },
          }}
          name="emailOrPhoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInputWithLabel
              error={errors.emailOrPhoneNumber?.message}
              label="Email or Phone"
              containerStyles={{ marginTop: 20 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              ref={emailOrPhoneNumberRef}
              onSubmitEditing={() => passwordRef?.current?.focus()}
            />
          )}
        />

        <Controller
          control={control}
          rules={{
            required: "Required",
            minLength: {
              message: "Should be at least 8 characters",
              value: 8,
            },
          }}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInputWithLabel
              label="Password"
              containerStyles={{ marginTop: 10 }}
              secureTextEntry={hidePassword}
              onBlur={onBlur}
              onChangeText={onChange}
              error={errors.password?.message}
              value={value}
              returnKeyType="go"
              onSubmitEditing={handleSubmit(onSubmit)}
              ref={passwordRef}
              rightIcon={
                <EyeToggleIcon
                  onChange={(hide) => {
                    setHidePassword(hide);
                  }}
                  color={"textMuted"}
                  initialHide={hidePassword}
                />
              }
            />
          )}
        />

        <ThemedButton
          title="Login"
          style={{ marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={!isValid}
        />
      </ThemedKeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}
