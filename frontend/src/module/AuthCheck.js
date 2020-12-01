const users=[
    {email:'customer', password:"123", name: 'customer'},
    {email:'admin', password:'123', name: "admin"},
    {email:'kitchen', password:'123', name:'kitchen'}
]

export default function signIn (email, password){
    const user= users.find(
        (user)=> user.email === email && user.password === password
    )
    if (user === undefined ) throw new Error()
    return user
}