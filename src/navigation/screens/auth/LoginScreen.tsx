import EyeToggleIcon from "@/components/EyeToggleIcon";
import { ThemedButton } from "@/components/ui/ThemedButton";
import ThemedInputWithLabel from "@/components/ui/ThemedInputWithLabel";
import { ThemedKeyboardAvoidingView } from "@/components/ui/ThemedKeyboardAvoidingView";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { APP_PADDING } from "@/constants/Values";
import { useSnackbar } from "@/context/SnackbarContext";
import { useLogin } from "@/hooks/authHooks";
import { ApiResponse } from "@/types/apiReponse";
import { User } from "@/types/user";
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";

export default function LoginScreen({
  route,
}: NativeStackScreenProps<any, any>) {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const emailOrPhoneNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation<any>();
  const snackbar = useSnackbar();
  const { mutate, isPending } = useLogin({
    onSuccess: (
      data: ApiResponse<{
        accessToken: string;
        user: User;
      }>
    ) => {
      snackbar.showSnackbar(`Welcome ${data.data.user.fullName}`, "success");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "ProtectedStack",
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
      emailOrPhoneNumber: route.params?.email as string || "",
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
      <ThemedKeyboardAvoidingView contentContainerStyle={{ padding: APP_PADDING }}>
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
        <ThemedText color="textMuted" style={{ marginTop: 10 }}>
          New to EventBooker, Click{" "}
          <ThemedText
            style={{ textDecorationLine: "underline" }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.push("RegisterScreen");
            }}
          >
            Here
          </ThemedText>{" "}
          to register new Account
        </ThemedText>
      </ThemedKeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}
