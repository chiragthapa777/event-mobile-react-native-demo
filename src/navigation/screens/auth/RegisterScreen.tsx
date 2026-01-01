import EyeToggleIcon from "@/components/EyeToggleIcon";
import { ThemedButton } from "@/components/ui/ThemedButton";
import ThemedDateTimePicker from "@/components/ui/ThemedDateTimePicker";
import ThemedInputWithLabel from "@/components/ui/ThemedInputWithLabel";
import { ThemedKeyboardAvoidingView } from "@/components/ui/ThemedKeyboardAvoidingView";
import { ThemedSafeAreaView } from "@/components/ui/ThemedSafeAreaView";
import { ThemedText } from "@/components/ui/ThemedText";
import { useSnackbar } from "@/context/SnackbarContext";
import { useLogin } from "@/hooks/authHooks";
import { Nav } from "@/navigation";
import { ApiResponse } from "@/types/apiReponse";
import { User } from "@/types/user";
import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "react-native";


export default function RegisterScreen() {
  const [date, setDate] = useState<Date>(new Date())
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const fullNameRef = useRef<TextInput>(null);
  const emailOrPhoneNumberRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const navigation = useNavigation<Nav>();
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
    mode: "onSubmit",
    defaultValues: {
      fullName: "",
      emailOrPhoneNumber: "",
      password: "",
      dob: "",
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
      <ThemedKeyboardAvoidingView contentContainerStyle={{ padding: 20 }}>
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
              error={errors.emailOrPhoneNumber?.message}
              label="Full Name"
              containerStyles={{ marginTop: 20 }}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              returnKeyType="next"
              ref={fullNameRef}
              onSubmitEditing={() => passwordRef?.current?.focus()}
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
        <ThemedDateTimePicker date={date} mode="date" setDate={setDate} error="" fullWidth  />
        

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
