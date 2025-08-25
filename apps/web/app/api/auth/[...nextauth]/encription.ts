import bcrypt from "bcryptjs";
export async function encription(password:string){
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(process.env.SALT!, salt);
    console.log(hash);
}