export interface UserInterface {
    uid: string,
    _id: string,
    displayName: {
        firstName: string,
        lastName: string,
    },
    email: string,
    phoneNumber: string,
    emailVarified: boolean,
    phoneVerified: boolean,
    address: {
        street: string,
        number: string,
        neighborhood: string,
        city: string,
        state: string,
        country: string,
        zipCode: string
    },
}



export interface OrderInterface {
    user: string,
    items: [],
    quantity: 
}