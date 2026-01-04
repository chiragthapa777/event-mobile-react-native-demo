import EyeToggleIcon from "@/components/EyeToggleIcon";
import { ThemedButton } from "@/components/ui/ThemedButton";
import ThemedDateTimePicker from "@/components/ui/ThemedDateTimePicker";
import ThemedInputWithLabel from "@/components/ui/ThemedInputWithLabel";
import { ThemedKeyboardAvoidingView } from "@/components/ui/ThemedKeyboardAvoidingView";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { APP_PADDING } from "@/constants/Values";
import { useSnackbar } from "@/context/SnackbarContext";
import { useRegister } from "@/hooks/authHooks";
import { Nav } from "@/navigation";
import { ApiResponse } from "@/types/apiReponse";
import { User } from "@/types/user";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";

export default function RegisterScreen() {
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const fullNameRef = useRef<TextInput>(null);
  const emailOrPhoneNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation<Nav>();
  const snackbar = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    getValues,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      emailOrPhoneNumber: "",
      password: "",
      dob: new Date("2000-01-03 04:55:22.412361"),
    },
  });
  const { mutate, isPending } = useRegister({
    onSuccess: (data: ApiResponse<User>) => {
      snackbar.showSnackbar(`Welcome ${data.data.fullName}`, "success");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "LoginScreen",
            params: {
              email: getValues().emailOrPhoneNumber,
            },
          },
        ],
      });
    },
  });

  useEffect(() => {
    fullNameRef?.current?.focus();
  }, []);

  const onSubmit = (data: any) => {
    mutate(data);
  };
  return (
    <ThemedSafeAreaView>
      <ThemedKeyboardAvoidingView
        contentContainerStyle={{ padding: APP_PADDING }}
      >
        <ThemedText type="largeThinTitle" style={{ marginTop: 80 }}>
          Welcome To
        </ThemedText>
        <ThemedText type="largeThinTitle" color="primary">
          Event Booker
        </ThemedText>

        <ThemedText color="textMuted" style={{ marginTop: 10 }}>
          Create a new account with your email
        </ThemedText>

        <Controller
          control={control}
          rules={{
            required: "Required",
            minLength: {
              message: "At least 3 characters",
              value: 3,
            },
            maxLength: {
              message: "At max 255 characters",
              value: 255,
            },
          }}
          name="fullName"
          render={({ field: { onChange, onBlur, value } }) => (
            <ThemedInputWithLabel
              error={errors.fullName?.message}
              label="Full Name"
              containerStyles={{ marginTop: 20 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              ref={fullNameRef}
              onSubmitEditing={() => emailOrPhoneNumberRef?.current?.focus()}
            />
          )}
        />
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
              returnKeyType="done"
              onSubmitEditing={() => {}}
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
        <Controller
          control={control}
          rules={{
            required: "Required",
          }}
          name="dob"
          render={({ field: { onChange, value } }) => (
            <ThemedView style={{ marginTop: 10 }}>
              <ThemedText color="textMuted">Date of birth</ThemedText>
              <ThemedDateTimePicker
                value={value}
                onChange={onChange}
                mode="date"
                error={errors.dob?.message}
                fullWidth
              />
            </ThemedView>
          )}
        />

        <ThemedButton
          title="Register"
          style={{ marginTop: 20 }}
          onPress={handleSubmit(onSubmit)}
          loading={isPending}
          disabled={!isValid}
        />
        <ThemedText color="textMuted" style={{ marginTop: 10 }}>
          Ready have a account, Click{" "}
          <ThemedText
            style={{ textDecorationLine: "underline" }}
            onPress={() => {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              navigation.push("LoginScreen");
            }}
          >
            Here
          </ThemedText>{" "}
          to login
        </ThemedText>
      </ThemedKeyboardAvoidingView>
    </ThemedSafeAreaView>
  );
}
