Feature: Ecommerce Validations

   Scenario: Placing the order
      Given  login into e-commerce application with "testNaveenGoki@gmail.com" and "$Smart93"
      When add product "Zara coat 3" to cart
      Then verify "Zara coat 3" is displayed in cart
      And enter the checkout details as "Naveen", "787", "ind"
      And verify the order with order details