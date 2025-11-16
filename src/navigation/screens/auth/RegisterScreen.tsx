import { ThemedInput } from '@/components/ui/ThemedInput'
import { ThemedKeyboardAvoidingView } from '@/components/ui/ThemedKeyboardAvoidingView'
import { ThemedSafeAreaScrollView } from '@/components/ui/ThemedSafeAreaScrollView'
import React from 'react'

export default function LoginScreen() {
  return (
    <ThemedSafeAreaScrollView>  
        <ThemedKeyboardAvoidingView>
            <ThemedInput />
        </ThemedKeyboardAvoidingView>
    </ThemedSafeAreaScrollView>
  )
}