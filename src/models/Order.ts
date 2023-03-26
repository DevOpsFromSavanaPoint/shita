import { Schema, model } from 'mongoose';

const OrderSchema = new Schema({
  user: { // Referência ao usuário que realizou o pedido
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [{ // Array de itens do pedido
    product: { // Referência ao produto do pedido
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    quantity: { // Quantidade do produto no pedido
      type: Number,
      required: true,
      min: 1,
    },
    price: { // Preço do produto no momento do pedido
      type: Number,
      required: true,
      min: 0,
    },
  }],
  status: { // Status atual do pedido
    type: String,
    enum: ['pending', 'processing', 'delivering', 'completed', 'cancelled'],
    required: true,
    default: 'pending',
  },
  payment: { // Informações do pagamento
    type: {
      method: { // Método de pagamento (ex: "credit card", "paypal")
        type: String,
        enum: ['mpesa', 'emola', 'mkesh', 'netshop', 'paypal'],
        required: true,
      },
      status: { // Status do pagamento
        type: String,
        enum: ['pending', 'approved', 'declined'],
        required: true,
        default: 'pending',
      },
      transaction_id: { // Identificador da transação (ex: número de autorização)
        type: String,
        required: false,
      },
    },
    required: true,
  },
  total_amount: { // Valor total do pedido
    type: Number,
    required: true,
    min: 0,
  },
  created_at: { // Data e hora de criação do pedido
    type: Date,
    required: true,
    default: Date.now,
  },
}, { timestamps: true });

export const Order = model('Order', OrderSchema);
