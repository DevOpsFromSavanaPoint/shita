// 1. Importar o módulo do pagamento
const Payment = require('payment-module');

// 2. Obter o ID da order a ser paga
const orderId = req.params.id;

// 3. Obter as informações do usuário que está fazendo o pagamento
const userId = req.user.id;
const userEmail = req.user.email;

// 4. Obter as informações de pagamento do usuário
const cardNumber = req.body.cardNumber;
const cardExpirationMonth = req.body.cardExpirationMonth;
const cardExpirationYear = req.body.cardExpirationYear;
const cardCvv = req.body.cardCvv;

// 5. Obter o valor total da order a ser paga
const order = await Order.findById(orderId);
const totalAmount = order.totalAmount;

// 6. Realizar o pagamento
const payment = new Payment({
  amount: totalAmount,
  cardNumber: cardNumber,
  cardExpirationMonth: cardExpirationMonth,
  cardExpirationYear: cardExpirationYear,
  cardCvv: cardCvv,
  userEmail: userEmail
});

// 7. Verificar se o pagamento foi autorizado
if (payment.authorized) {
  // 8. Atualizar o status da order para "paga"
  order.status = "paid";
  await order.save();

  // 9. Criar um registro do pagamento no banco de dados
  const newPayment = new PaymentModel({
    orderId: orderId,
    status: "paid",
    amount: totalAmount,
    paymentMethod: "credit_card",
    cardLastFourDigits: cardNumber.slice(-4),
    userEmail: userEmail
  });
  await newPayment.save();

  // 10. Retornar uma resposta de sucesso
  res.status(200).json({
    message: "Pagamento realizado com sucesso."
  });
} else {
  // 11. Retornar uma resposta de erro se o pagamento não foi autorizado
  res.status(400).json({
    message: "Não foi possível realizar o pagamento. Por favor, verifique os dados do cartão e tente novamente."
  });
}
