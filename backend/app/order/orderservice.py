import os
import stripe
import mail1
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from dto.orderschema import OrderCreatePlaceOrder
from models.ordermodels import OrderModel, OrderItemsModel, ShippingAddressModel
from models.usermodels import User

from uuid import uuid4

stripe.api_key = os.environ.get("STRIPE_KEY")


def send_mail(subject, text, recipients):
    mail1.send(subject=subject,
               text=text,
               recipients=recipients,
               sender='shop@email',
               username='shop@email',
               password='shops_email_password',
               smtp_host='smtp.shops.email')


class OrderService:
    def getAll(db: Session):
        orders_with_items = (
            db.query(OrderModel, OrderItemsModel)
            .join(OrderItemsModel, OrderModel.id == OrderItemsModel.order_id)
            .all()
        )

        result = []
        for order, order_item in orders_with_items:
            order_data = {
                "id": order.id,
                "name": order.name,
                "email": order.email,
                "orderAmount": order.orderAmount,
                "transactionId": order.transactionId,
                "isDelivered": order.isDelivered,
                "user_id": order.user_id,
                "created_at": order.created_at,
                "updated_at": order.updated_at,
                "order_items": [{
                    "id": order_item.id,
                    "name": order_item.name,
                    "quantity": order_item.quantity,
                    "price": order_item.price,
                }]
            }
            exist=False

            for data in result:
                if data["id"] == order.id:
                    data["order_items"].append(
                        {
                            "id": order_item.id,
                            "name": order_item.name,
                            "quantity": order_item.quantity,
                            "price": order_item.price,
                        }
                    )
                    exist=True
            if not exist:
                result.append(order_data)

        return jsonable_encoder(result)


    def createOrderPlace(request: OrderCreatePlaceOrder, db: Session):
        
        order_create = OrderModel(
            user_id=request.currentUser.id,
            name=request.currentUser.name,
            email=request.currentUser.email,
            orderAmount=request.subtotal,
            transactionId=uuid4()
        )
        db.add(order_create)
        db.commit()

        db_orderid = db.query(OrderModel).filter(OrderModel.user_id == request.currentUser.id).first()

        shipping_a = ShippingAddressModel(
            address=request.token.card.address_line1,
            city=request.token.card.address_city,
            country=request.token.card.address_country,
            postalCode=int(request.token.card.address_zip),
            order_id=db_orderid.id,
        )
        db.add(shipping_a)

        for dic in request.cartItems:
            order_item_a = OrderItemsModel(
                name=dic.name,
                quantity=dic.quantity,
                price=dic.price,
                order_id=db_orderid.id,
            )
            db.add(order_item_a)

        db.commit()

        db_orderid = db.query(User).filter(User.is_staff == True)
        for manager in db_orderid:
            try:
                count = 0
                msg = f'Уважаемый, {str(manager.name).title()}.\n\nНа сайте SoundScape был сделан заказ:\n\n' + \
                      f'Заказчик: {str(request.currentUser.name).title()} ({request.currentUser.email})\n' +\
                      f'Адрес доставки: {request.token.card.address_zip}, {request.token.card.address_line1},' + \
                      f'{request.token.card.address_city}, {request.token.card.address_country}\n\n'+ \
                      f'Заказанный товар:\n\n'
                for dic in request.cartItems:
                    count += int(dic.quantity) * float(dic.price)
                    msg += f'\tТовар: {dic.name}\n' +\
                           f'\tКоличество: {dic.quantity}\n' +\
                           f'\tЦена за 1 ед.:  {dic.price}\n\n'

                msg += f'Итоговая сумма заказа: {round(count, 2)} рублей.'

                send_mail("Деньги потекли рекой!",
                          msg,
                          manager.email)
            except:
                print('Не удалось отпраивть письмо для пользователя:', manager.name)
                continue

        return request

    def getOrderById(id: int, db: Session):
        order_byid = db.query(OrderModel).filter(OrderModel.id == id).first()
        # order_byid, orderItembyid = db.query(OrderModel, OrderItemsModel).join(OrderItemsModel, OrderModel.id == OrderItemsModel.order_id).filter(OrderModel.id == id)

        orderItembyid = (
            db.query(OrderItemsModel).filter(OrderItemsModel.order_id == id).all()
        )

        shippingByid = (
            db.query(ShippingAddressModel)
            .filter(ShippingAddressModel.order_id == order_byid.id)
            .first()
        )

        response = {
            "name": order_byid.name,
            "email": order_byid.email,
            "orderAmount": order_byid.orderAmount,
            "transactionId": order_byid.transactionId,
            "isDelivered": order_byid.isDelivered,
            "user_id": order_byid.user_id,
            "created_at": order_byid.created_at,
            "updated_at": order_byid.updated_at,
            "orderItems": orderItembyid,
            "shippingAddress": shippingByid,
        }

        return response

    def getOrderByUserId(userid: int, db: Session):
        order_by_userid = (
            db.query(OrderModel).filter(OrderModel.user_id == userid).all()
        )

        return order_by_userid

    def deleteOrderById(orderid: int, db: Session):
        try:
            order = db.query(OrderModel).filter(OrderModel.id == orderid).first()
            db.delete(order)
            db.commit()
            return "Order deleted success"
        except Exception as e:
            return str(e)
