from sqlalchemy import Column, DateTime, Integer, String, func, Float, BigInteger, Boolean, update
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.sql.expression import case
from typing import List, Dict, AnyStr
from datetime import datetime
from src.db import engine, session


Base = declarative_base()


class AccountBalance(Base):
    __tablename__ = "accountbalance"

    id = Column(Integer, primary_key=True)
    address = Column(String(100), nullable=False, unique=True)
    account_type = Column(String(100), nullable=False)
    balance = Column(BigInteger, nullable=False)
    unlocked = Column(BigInteger, nullable=True)
    wallet_type = Column(String(1), nullable=False, default='X')
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

    # def lookup_wallet_type(address: AnyStr) -> AnyStr:
    #     """
    #     Checks if a given address is a slow wallet.
    #     :param address: the address to check
    #     :return: 'S' > Slow, 'C' > Community, 'O' > Other
    #     """
    #     # We are checking both 'SlowWallet' and 'Community' occurence in the query output
    #     with os.popen(f"ol -a {address} query -r | sed -n '/SlowWallet/,/StructTag/p'") as f:
    #         for elem in f.readlines():
    #             if 'SlowWallet' in elem:
    #                 return 'S'
    #     return 'N'

    # def update_wallet_type(obj: Dict) -> None:
    #     """
    #     Update wallet type
    #     """
    #     ab = session\
    #         .query(AccountBalance)\
    #         .filter(AccountBalance.address == obj['address'])\
    #         .first()
    #     ab.wallet_type = obj['wallet_type']
    #     session.commit()
    
    # def update_unlocked(obj: Dict) -> None:
    #     """
    #     Update unlocked amount
    #     """
    #     ab = session\
    #         .query(AccountBalance)\
    #         .filter(AccountBalance.address == obj['address'])\
    #         .first()
    #     ab.unlocked = obj['unlocked']
    #     session.commit()

    # def lookup_unlocked(address: AnyStr) -> int:
    #     """
    #     Checks if a given address is a slow wallet.
    #     :param address: the address to check
    #     :return: 
    #     """        
    #     amt = 0

    #     # We are checking both 'SlowWallet' and 'Community' occurence in the query output
    #     with os.popen(f"ol -a {address} query -u") as f:
    #         for line in f.readlines():
    #             if re.search("(UNLOCKED)", line):
    #                 # print(f"line={line}")
    #                 amt = int(int(line.split(' ')[2]) / 1000000)
    #     return amt

    # def lookup_wallets_unlocked(self) -> None:
    #     wallets = session\
    #         .query(AccountBalance)\
    #         .filter(
    #             AccountBalance.balance > 0, AccountBalance.wallet_type == 'S')\
    #         .all()
    #     for v in wallets:
    #         v.unlocked = self.lookup_unlocked(v.address)
    #     session.commit()
    
    # def lookup_wallet_types(self) -> None:
    #     validators = session\
    #         .query(AccountBalance)\
    #         .filter(
    #             AccountBalance.balance > 0,
    #             or_(AccountBalance.account_type == 'basic', 
    #                 AccountBalance.account_type == 'miner'))\
    #         .all()
    #     for v in validators:
    #         v.wallet_type = self.lookup_wallet_type(v.address)
    #         print(f"{v.address} > {v.wallet_type}")
    #     session.commit()

    def upload_balances(balance_list: List) -> None:
        try:
            # Iterate objects and store them in the db
            for pe_obj in balance_list:
                ab = session\
                    .query(AccountBalance)\
                    .filter(AccountBalance.address == pe_obj['address'])\
                    .scalar()

                o = AccountBalance(
                    address=pe_obj['address'],
                    balance=int(pe_obj['balance']),
                    account_type=pe_obj['account_type']
                )

                if ab:
                    o.id = ab.id
                    o.unlocked=ab.unlocked,
                    o.wallet_type=ab.wallet_type
                    session.merge(o)
                else:
                    session.add(o)

            session.commit()
        except Exception as e:
            print(f"[{datetime.now()}]:ERROR:{e}")


# class ValidatorSet(Base):
#     __tablename__ = "validatorset"

#     id = Column(Integer, primary_key=True)
#     address = Column(String(100), nullable=False, unique=True)
#     ip = Column(String(15), nullable=False)
#     is_active = Column(Boolean, default=False)
#     _json = Column(JSONB, nullable=False)
#     tower_epoch = Column(Integer, nullable=False)
#     created_at = Column(DateTime, server_default=func.now())
#     updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

#     def load_validator_list(validator_list: List) -> None:
#         try:
#             if len(validator_list) > 0:
#                 # reset is_active flag
#                 u = update(ValidatorSet)
#                 u = u.values({"is_active": False})
#                 u = u.where(ValidatorSet.is_active == True)
#                 engine.execute(u)

#                 for val in validator_list:
#                     # check if validator already exists and fetch its id
#                     id = session.query(ValidatorSet.id)\
#                         .filter(ValidatorSet.address==val['account_address'])\
#                         .first()
#                     avs = ValidatorSet(
#                         address = val['account_address'],
#                         ip = val['validator_ip'],
#                         is_active = True,
#                         _json = val,
#                         tower_epoch = val['tower_epoch']
#                     )
#                     if id:
#                         avs.id = id[0]
#                         session.merge(avs)
#                     else:
#                         session.add(avs)
#                     session.commit()
#         except Exception as e:
#             # TODO add proper logging + throw specific exception to break when called in a loop
#             print(f"[{datetime.now()}]:{e}")
        

# class WalletDescription(Base):
#     __tablename__ = "walletdescription"

#     id = Column(Integer, primary_key=True)
#     address = Column(String(100), nullable=False, unique=True)
#     program_name = Column(String(500), nullable=False, default='unknown') 
#     description = Column(String(2000), nullable=False, default='unknown')
#     focus = Column(String(50), nullable=False, default='unknown')
#     manager = Column(String(200), nullable=False, default='unknown')
#     created_at = Column(DateTime, server_default=func.now())
#     updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())

#     def load_community_wallet(comm_wallet: Dict):
#         try:
#             id = session.query(WalletDescription.id)\
#                 .filter(WalletDescription.address==comm_wallet["address"])\
#                 .first()
#             wd = WalletDescription(
#                 address = comm_wallet["address"],
#                 program_name = comm_wallet["program"],
#                 description = comm_wallet["description"],
#                 focus = comm_wallet["focus"],
#                 manager = comm_wallet["manager"],
#             )
#             if id:
#                 wd.id = id[0]
#                 session.merge(wd)
#             else:
#                 session.add(wd)
#             session.commit()
#         except Exception as e:
#             # TODO add proper logging + throw specific exception to break when called in a loop
#             print(f"[{datetime.now()}]:{e}")


if engine:
    Base.metadata.create_all(engine)
