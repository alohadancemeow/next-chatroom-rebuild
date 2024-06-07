"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

import {
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { UserSchema } from "@/types";
import { RotateCcw } from "lucide-react";

type Props = {
  containerRef?: React.LegacyRef<HTMLDivElement> | undefined;
};

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must greater than 6" }),
});

const Register = ({ containerRef }: Props) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const { email, password } = values;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      setLoading(false);
      return toast.error("Email already in use!");
    }

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const userData: UserSchema = {
        email,
        id: res.user.uid,
        avatar: "",
        bio: "",
        status: "",
        username: email.split("@")[0],
        blocked: [],
        links: [],
      };

      await setDoc(doc(db, "users", res.user.uid), { ...userData });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      await signInWithEmailAndPassword(auth, email, password);

      toast.success("Account created! 🎉");
    } catch (err) {
      console.log(err);
      toast.error("Somthing went wrong, Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col" ref={containerRef}>
      <div className="text-2xl font-bold text-center">Sign up</div>

      <div className="flex flex-col">
        <div className="w-[350px]">
          <img src="/user.svg" alt="logo" className="w-full h-full" />
        </div>
        <div className="p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="example@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password"
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-center">
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <div className="flex justify-center items-center">
                      <RotateCcw className="mr-2 h-4 w-4 animate-spin" />
                      <div>Sign up...</div>
                    </div>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
