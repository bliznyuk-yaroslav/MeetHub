import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { JWT_SECRET } from "../constant/index";   
import { prisma } from "../db/prisma";
export const register = async (req: Request, res: Response) => {
try {
    const {email, password, name} = req.body as {email?: string; password?: string; name?: string}
    if(!email || !password){
        return res.status(400).json({message: "Email and password are required"});
    }
    const existing = await prisma.user.findUnique({where: {email}});
    if(existing){
        return res.status(409).json({message: "User already exists"});}
        const passwordHash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({ data: {email, passwordHash, name}});
    const token = jwt.sign({ id: user.id, email: user.email,  name: user.name}, JWT_SECRET , {expiresIn: "7d"});
    return res.status(201).json({token});
} catch (error) {
    return res.status(500).json({message: 'Registration failed', error });  
}
}
export const login = async (req: Request, res: Response) => {
try {
    const { email, password} = req.body as { email?: string; password?: string}
    if( !email || !password){
        return res.status(400). json({ message: 'Email and password are required'});
    }
    const user =  await prisma.user.findUnique({where : { email }});
    if(!user){
return res.status(401).json({message: "Invalid credentials"});
    } 
    const ok = await bcrypt.compare(password, user.passwordHash);
    if(!ok){
        return res.status(401).json({message: 'Invalid credentials'});
    }
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name ?? null }, JWT_SECRET, { expiresIn: '7d' });   
return res.status(200).json({token});  
} catch (error) {
    
    return res.status(500).json({message: 'Login failed', error });
}
}