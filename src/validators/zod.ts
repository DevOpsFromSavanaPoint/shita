import z from 'zod';


export const userZodSchema = z.object({
    displayName: z.object({
        firstName: z.string(),
        lastName: z.string(),
    }).required(),
    email: z.string().email(),
    password: z.string().min(6),
    address: z.object({
        street: z.string(),
        number: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        country: z.string(),
        zipCode: z.string(),
    }),
    phoneNumber: z.string(),
    phoneVerified: z.boolean().default(false),
    emailVerified: z.boolean().default(false),
}).strict();

export type UserType = z.infer<typeof userZodSchema>;



export const categoryZodSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().max(200),
});


export type CateGoryType = z.infer<typeof categoryZodSchema>


export const DishSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(500),
    category: z.string(),
    price: z.number().min(0),
    image: z.string().url().optional()
});

export type DishType = z.infer<typeof DishSchema>;


export const ItemInputSchema = z.object({
    product: z.string(),
    quantity: z.number().positive(),
    price: z.number().positive(),
});

export type ItemInput = z.infer<typeof ItemInputSchema>;


export const menuValidator = z.object({
    name: z.string().nonempty(),
    description: z.string().optional(),
    restaurant: z.string().nonempty(),
    products: z.array(z.string()).optional(),
    created_at: z.date().optional(),
    updated_at: z.date().optional()
});


export type MenuType = z.infer<typeof menuValidator>;

export const paymentSchema = z.object({
    order: z.string().min(1),
    amount: z.number().min(0),
    status: z.enum(['paid', 'not_paid']),
    method: z.enum(['mpesa', 'emola', 'mkesh', 'netshop', 'paypal']),
    transactionId: z.string().optional(),
});

export type PaymentType = z.infer<typeof paymentSchema>

export const orderSchema = z.object({
    user: z.string(),
    items: z.string(),
    status: z.enum(['pending', 'processing', 'delivering', 'completed', 'cancelled']).default('pending'),
    payment: paymentSchema.required(),
    total_amount: z.number().min(0),
    created_at: z.date().default(() => new Date()),
});


export const ProductSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().positive(),
    category: z.string().uuid(),
    image: z.string().min(1),
    createdAt: z.date().optional(),
});


export type ProductType = z.infer<typeof ProductSchema>



export const LocationSchema = z.object({
    type: z.literal('Point'),
    coordinates: z.tuple([z.number(), z.number()]),
});

export type LocationType = z.infer<typeof LocationSchema>;


export const RestaurantSchema = z.object({
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    location: LocationSchema,
    address: z.string().nonempty(),
    phone: z
        .string()
        .regex(/\d{3}-\d{3}-\d{4}/)
        .transform((val) => val.replace(/\D/g, '')),
    menu: z.array(z.string()),
    rating: z.number().min(0).max(5),
    reviews: z.array(z.string()),
});

export type RestaurantType = z.infer<typeof RestaurantSchema>



export const ReviewValidationSchema = z.object({
    user: z.string(),
    dish: z.string(),
    rating: z.number().min(1).max(5),
    comment: z.string().optional()
});

export type ReviewType = z.infer<typeof ReviewValidationSchema>



export const DeliveryPersonValidationSchema = z.object({
    name: z.string().min(2).max(255),
    email: z.string().email().max(255),
    password: z.string().min(8).max(255),
    phone: z.string().regex(/^\d{3}-\d{3}-\d{4}$/),
    vehicle: z.enum(['Bike', 'Car', 'Motorcycle', 'Other']),
    licensePlate: z.string().length(7),
    currentLocation: z.object({
      type: z.literal('Point'),
      coordinates: z.tuple([z.number(), z.number()])
    }),
    isWorking: z.boolean(),
    isAvailable: z.boolean(),
    orders: z.array(z.string().uuid())
  });
  
  export type DeliveryPersonType = z.infer<typeof DeliveryPersonValidationSchema>


  export const DeliveryDataSchema = z.object({
    order: z.string().nonempty(),
    deliveryPerson: z.string().optional(),
    deliveryStatus: z.enum(['pending', 'in_progress', 'delivered', 'canceled']),
    deliveryStartedAt: z.date().optional(),
    deliveryFinishedAt: z.date().optional(),
    deliveryNotes: z.string().optional(),
  });


  export type DeliveryDataType = z.infer<typeof DeliveryDataSchema>