import User from "../model/user_schema.js";
import bcrypt, { compare } from 'bcrypt';


// register page
export const registerPage = (req, res) => {
    res.render('registerPage', { url: req.url})
}


// login page
export const loginPage = (req, res) => {
    res.render('loginPage', { url: req.url})
}

// signup
export const signup = async (req, res) =>{
    let { username, email, password } = req.body;
    password = await bcrypt.hash(password, 10);

    try{
        const user = await User.findOne({email});
        if(user){
            return res.redirect('/error?msg=User%20already%20exist')
        }
        await User.create({ username, email, password });
        res.redirect('/success?msg=User%20registered%20successfully')
    }
    catch(err){
        res.redirect('/error')
        console.log(err)
    }  
}

// login
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        return res.render('error', { msg: 'User account does not exist', url: req.url })
    }
    const passwordMatched = await compare(password, user.password)

    if(user.email == email && passwordMatched){
        return res.redirect('/success?msg=User%20loggedin%20successfully');
    }
    res.redirect('/error?msg=Enter%20correct%20password')
}


// error page
export const error = async (req, res) => {
    const { msg } = req.query;
    res.render('error', { 
        msg: msg || "Something went wrong",
        url: req.url
     });
}


// success page
export const success = async (req, res) => {
    const { msg } = req.query;
    res.render('success', { 
        msg: msg || "Operation completed successfully",
        url: req.url
    });
}