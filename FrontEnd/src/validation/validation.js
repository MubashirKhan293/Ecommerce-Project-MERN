// src/validation.js
import { z } from 'zod';

export const signupSchema = z.object({
  username: z.string().min(1, "Username is required").max(50, "Username can't exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(1, "Address is required"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
