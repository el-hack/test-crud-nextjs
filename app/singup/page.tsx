'use client'
import Image from "next/image"
import Link from "next/link"
import * as z from "zod";
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthDto } from "@/services/auth/types/auth.dto"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import AuthService from "@/services/auth/auth.service";
import { useState } from "react";
import { Alert } from "@/components/ui/alert";
import { toast } from 'react-hot-toast';
import { setCookie, parseCookies } from 'nookies';
import authConfig from '@/utils/auth';
import { userStore } from "@/store/user/user.store";
import { useRouter } from "next/navigation";


export default function page() {

  const [reponse, setReponse] = useState('')
  const useUserStore = userStore()
  const route = useRouter()

  // zod validation with useForm
  const defaultValues: AuthDto = {
    email: "",
    password: "",
  }

  const schema = z.object({
    email: z.string().email({ message: "Email invalide" }),
    password: z.string().min(6),
  })

  const {
    register,
    handleSubmit,
    control,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthDto>({
    defaultValues,
    resolver: zodResolver(schema),
  });



  const onSubmit = async (data: AuthDto) => {
    const response = await AuthService.login(data.email, data.password)

    if (response.status) {
      useUserStore.setUser(response.data)
      setCookie(null, authConfig.storageTokenKeyName, response.data.token.access_token, { maxAge: 60 * 60 * 24 * 30, path: '*' })
      route.push('/')
      toast.success('Connexion reussie')
    } else {
      setReponse(response.message)
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Entrez votre adresse e-mail ci-dessous pour vous connecter &agrave; votre compte
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          {...field}
                          type="email"
                          placeholder="m@example.com"
                          required
                        />
                        {errors.email && (
                          <span role="alert" className="text-error">
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    )}
                  />
                </div>
                <div className="grid gap-2">
                  <Controller
                    name="password"
                    control={control}
                    render={({ field, formState }) => (
                      <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input id="password" type="password" required
                          {...field}
                        />
                        <div className="flex items-center">
                          {errors.password && (
                            <span role="alert" className="text-error">
                              {errors.password.message}
                            </span>
                          )}
                          <Link
                            href="/forgot-password"
                            className="ml-auto inline-block text-sm underline"
                          >
                            Mot de passe oublié?
                          </Link>
                        </div>

                      </div>
                    )}
                  />
                </div>
                <div>
                  {reponse ?? <Alert variant="destructive" role="alert" color="error">{reponse}</Alert>}
                </div>
                <Button type="submit" disabled={isSubmitting} className="w-full">
                  {isSubmitting ?? <RotateCcw />}
                  Connexion
                </Button>
                <Link href={"/"}>
                  <Button variant="outline" className="w-full" type="button">
                    Connectez-vous avec Google
                  </Button>
                </Link>
              </div>
            </form>
          </div>
        </div>
        <div className="hidden bg-muted lg:block">
          <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          />
        </div>
      </div>
    </div>
  )
}