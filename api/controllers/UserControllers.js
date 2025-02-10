import User from '../models/UserModel.js';
import bcrypt from 'bcryptjs';

export const test = async (req, res) => {
    res.json({ data: 'heyyya i amm Serrrverrr!!!!' });
}

export const SignUp = async (req, res) => {
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);

    try {
        await User.create({
            username,
            email,
            password: hashPassword
        })
        res.status(201).json({ message: "User is Created Successfully" })
    } catch (error) {
        if (error?.errorResponse?.keyValue?.username) {
            res.status(409).json({ error: "Try Different Username" })
        }
        else if (error?.errorResponse?.keyValue?.email) {
            res.status(409).json({ error: "Try Different Email" })
        }
        console.log(error)
    }
}

export const SignIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const validUser = await User.findOne({ email });
        if (!validUser) return res.status(404).json({
            error: "Email not Found"
        })
        // console.log("**************************************************" + validUser)
        const validPassword = bcrypt.compareSync(password, validUser.password);
        if (!validPassword) return res.status(404).json({
            error: "Wronge Password"
        });

        res.status(200).json({
            message: "SignIn Successfully"
        })

    } catch (error) {
        console.log(error)
    }
}