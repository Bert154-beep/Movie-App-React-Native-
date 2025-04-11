import { Stack } from "expo-router";
import { Slot } from "expo-router";
import { UserProvider } from '../Context/UserContext'
import { MovieProvider } from '../Context/MovieContext'


export default function RootLayout() {
  return (
    <UserProvider>
      <MovieProvider>
        <Slot>
          <Stack>
            <Stack.Screen
              name="index"
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="Moviescreen"
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false
              }}
            />
            <Stack.Screen
              name="(auth)"
              options={{
                headerShown: false
              }}
            />
          </Stack>
        </Slot>
      </MovieProvider>
    </UserProvider>
  )
}
