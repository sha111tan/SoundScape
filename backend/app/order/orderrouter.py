from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from config.database import get_db
from dto.orderschema import OrderCreatePlaceOrder
from .orderservice import OrderService

router = APIRouter(prefix="/order", tags=["Заказы"])


@router.get("/")
def getAll(db: Session = Depends(get_db)):
    return OrderService.getAll(db=db)


@router.post("/")
def createOrder(request: OrderCreatePlaceOrder, db: Session = Depends(get_db)):
    return OrderService.createOrderPlace(request=request, db=db)


@router.get("/orderbyuser/{userid}")
def orderByUser(userid: int, db: Session = Depends(get_db)):
    return OrderService.getOrderByUserId(userid=userid, db=db)


@router.get("/orderbyid/{id}")
def orderById(id: int, db: Session = Depends(get_db)):
    return OrderService.getOrderById(id=id, db=db)


@router.delete("/orderbyid/{id}")
def deleteById(orderid: int, db: Session = Depends(get_db)):
    return OrderService.deleteOrderById(orderid=orderid, db=db)


